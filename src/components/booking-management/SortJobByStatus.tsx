import {ChangeEvent} from "react";

type JobStatus = "OPEN" | "ASSIGNED" | "WAITING_FOR_APPROVAL" | "NOT_APPROVED" | "APPROVED" | "CLOSED";

interface ISortJobByStatus {
    selectedStatus: JobStatus | undefined;
    handleStatusChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export default function SortJobByStatus({selectedStatus, handleStatusChange}: ISortJobByStatus) {
    return (
        <div className="form-group mb-3">
            <label htmlFor="statusSelect" className="fw-bold mb-1">Sortera på status</label>
            <select
                id="statusSelect"
                className="form-control"
                value={selectedStatus}
                onChange={handleStatusChange}
            >
                <option value={""}>Visa alla jobb...</option>
                <option value={"OPEN" as JobStatus}>Ingen städare tilldelad jobbet</option>
                <option value={"ASSIGNED" as JobStatus}>Städare tilldelad jobbet</option>
                <option value={"WAITING_FOR_APPROVAL" as JobStatus}>Väntar på godkännande</option>
                <option value={"NOT_APPROVED" as JobStatus}>Ej godkänd städning</option>
            </select>
        </div>
    )
}