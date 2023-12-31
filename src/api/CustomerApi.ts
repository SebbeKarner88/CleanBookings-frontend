import api from "./ApiRootUrl.ts";

async function refreshToken() {
    try {
        const response = await api.post(
            "customer/refresh-token",
            null,
            {
                headers: {
                    "refresh_token": sessionStorage.getItem("refresh_token")
                }
            }
        );
        if (response?.status == 200) {
            sessionStorage.setItem("access_token", response.data.accessToken);
            sessionStorage.setItem("refresh_token", response.data.refreshToken);
        }
        return response;
    } catch (error) {
        console.error("Error refreshing token: " + error);
    }
}

export async function loginCustomer(
    email: string,
    password: string
) {
    try {
        const response = await api.post(
            "customer/login",
            {
                email: email,
                password: password
            }
        );
        if (response.status == 200) {
            sessionStorage.setItem("isAuthenticated", "true");
            // TODO: Customer ID could be removed when backend is updated to not require this anymore (it's included in the access_token)
            sessionStorage.setItem("customerId", response.data.customerId);
            sessionStorage.setItem("name", response.data.name);
            sessionStorage.setItem("username", email);
            sessionStorage.setItem("access_token", response.data.accessToken);
            sessionStorage.setItem("refresh_token", response.data.refreshToken);
            sessionStorage.setItem("role", response.data.role);
            return response;
        }
    } catch (error) {
        console.error(error);
    }
}

export async function logout() {
    try {
        const response = await api.post(
            "customer/logout",
            null,
            {
                headers: {
                    "refresh_token": sessionStorage.getItem("refresh_token")
                }
            }
        );
        if (response?.status == 204) {
            sessionStorage.removeItem("access_token");
            sessionStorage.removeItem("refresh_token");
            sessionStorage.removeItem("role");
        }
        return response;
    } catch (error) {
        console.error("Error handling logout call: " + error);
    }
}

export async function registerCustomer(
    firstName: string,
    lastName: string,
    personNumber: string,
    streetAddress: string,
    postalCode: number,
    city: string,
    phoneNumber: string,
    emailAddress: string,
    password: string,
) {
    try {
        return await api.post(
            "customer",
            {
                firstName: firstName,
                lastName: lastName,
                personNumber: personNumber,
                customerType: "PRIVATE",
                streetAddress: streetAddress,
                postalCode: postalCode,
                city: city,
                phoneNumber: phoneNumber,
                emailAddress: emailAddress,
                password: password
            }
        );
    } catch (error: any) {
        console.error(error);
        return error;
    }
}

export async function bookService(
    customerId: string | null,
    type: string,
    date: string,
    timeslot: string,
    message?: string | undefined
) {
    try {
        return await api.post(
            "job",
            {
                customerId: customerId,
                type: type,
                date: date,
                timeslot: timeslot,
                message: message
            },
            {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("access_token")}`
                }
            }
        );
    } catch (error: any) {
        if (error.response.status == 401) {
            const response = await refreshToken();
            if (response?.status == 200)
                return bookService(customerId, type, date, timeslot, message);
        } else {
            console.error(error);
            return error;
        }
    }
}

export async function updateCustomerData(
    customerId: string | null,
    firstName?: string,
    lastName?: string,
    streetAddress?: string,
    postalCode?: number,
    city?: string,
    phoneNumber?: string,
    emailAddress?: string
) {
    try {
        return await api.put(
            `customer/updateCustomer/${customerId}`,
            {
                firstName: firstName,
                lastName: lastName,
                streetAddress: streetAddress,
                postalCode: postalCode,
                city: city,
                phoneNumber: phoneNumber,
                emailAddress: emailAddress
            },
            {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("access_token")}`
                }
            }
        );
    } catch (error: any) {
        if (error.response.status == 401) {
            const response = await refreshToken();
            if (response?.status == 200)
                return updateCustomerData(customerId, firstName, lastName, streetAddress, postalCode, city, phoneNumber, emailAddress);
        } else {
            console.error(error);
        }
    }
}

export async function updatePassword(
    customerId: string | null,
    currentPassword: string,
    newPassword: string
) {
    try {
        return await api.put(
            `/customer/updatePassword/${customerId}`,
            {
                oldPassword: currentPassword,
                newPassword: newPassword
            },
            {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("access_token")}`
                }
            }
        );
    } catch (error: any) {
        if (error.response.status == 401) {
            const response = await refreshToken();
            if (response?.status == 200)
                return updatePassword(customerId, currentPassword, newPassword);
        } else {
            console.error(error);
        }
    }
}

export async function getJobsByCustomerId(customerId: string | null) {
    try {
        const response = await api.get(
            "/job/jobs",
            {
                params: {
                    customerId: customerId,
                },
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("access_token")}`
                }
            });
        if (response.status == 200)
            return response;
    } catch (error: any) {
        if (error.response.status == 401) {
            const response = await refreshToken();
            if (response?.status == 200)
                return getJobsByCustomerId(customerId);
        } else {
            console.error(error);
        }
    }
}

export async function getJobsByStatus(
    customerId: string | null,
    status?: null | "OPEN" | "ASSIGNED" | "WAITING_FOR_APPROVAL" | "NOT_APPROVED" | "APPROVED" | "CLOSED"
) {
    try {
        const response = await api.get(
            `/job/cleanings/${customerId}`,
            {
                params: {
                    status: status
                },
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("access_token")}`
                }
            });
        if (response.status == 200)
            return response;
    } catch (error: any) {
        if (error.response.status == 401) {
            const response = await refreshToken();
            if (response?.status === 200)
                return getJobsByStatus(customerId, status);
        } else {
            console.error(error);
        }
    }
}

export async function getAllCleaners() {
    try {
        const response = await api.get(
            "/employee/getAllCleaners"
        );
        if (response.status == 200)
            return response;
    } catch (error) {
        console.error(error);
    }
}

export async function executedCleaningRequest(
    customerId: string | null,
    jobId: string
) {
    try {
        const response = await api.put(
            "/job/executed-cleaning",
            {
                userId: customerId,
                jobId: jobId
            }, {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("access_token")}`
                }
            });
        if (response.status == 200)
            return response;
    } catch (error: any) {
        if (error.response.status == 401) {
            const response = await refreshToken();
            if (response?.status == 200)
                return executedCleaningRequest(customerId, jobId);
        } else {
            console.error(error);
        }
    }
}

export async function sendCustomerMessage(
    name: string,
    email: string,
    subject: string,
    message: string,
    htmlSnippet: string
) {
    try {
        const response = await api.post(
            "customer/receive-msg",
            {
                name: name,
                email: email,
                subject: subject,
                message: message,
                htmlSnippet: htmlSnippet
            }
        )
        if (response.status == 200) {
            return response;
        }
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

export async function handleCustomerFeedback(
    jobId: string,
    customerId: string | null,
    isApproved: true | false,
    message?: string
) {
    try {
        const response = await api.put(
            "job/approve-fail-cleaning",
            {
                jobId: jobId,
                customerId: customerId,
                isApproved: isApproved,
                message: message
            }, {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("access_token")}`
                }
            }
        );
        if (response.status == 200)
            return response;
    } catch (error: any) {
        if (error.response.status == 401) {
            const response = await refreshToken();
            if (response?.status == 200)
                return handleCustomerFeedback(jobId, customerId, isApproved, message);
        } else {
            return error.response;
        }
    }
}

export async function cancelJob(jobId: string) {
    try {
        return await api.delete(
            `job`,
            {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("access_token")}`
                },
                params: {
                    jobId: jobId
                }
            }
        )
    } catch (error: any) {
        if (error.response.status == 401) {
            const response = await refreshToken();
            if (response?.status == 200)
                return cancelJob(jobId);
        } else {
            return error.response;
        }
    }
}