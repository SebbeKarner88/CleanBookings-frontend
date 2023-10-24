import {Button, Table} from "react-bootstrap";
import {useState} from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface Job {
    id: string;
    bookedDate: string;
    type: string;
    message: string;
    status: string;
}

interface IClosedJobsTable {
    jobs: Job[] | undefined;
}

export default function ClosedJobsTable({jobs}: IClosedJobsTable) {
    const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

    function formatDate(date: string) {
        return new Date(date).toLocaleDateString();
    }

    function toggleRowExpansion(id: string) {
        setExpandedRows((prevExpandedRows) => ({
            ...prevExpandedRows,
            [id]: !prevExpandedRows[id],
        }));
    }

    return (
        <>
            <Table
                responsive
                striped={true}
                hover={true}
            >
                <thead>
                <tr>
                    <th>
                        ID
                    </th>
                    <th>
                        Datum
                    </th>
                    <th>
                        Städtjänst
                    </th>
                    <th>
                        Meddelande(n)
                    </th>
                </tr>
                </thead>
                <tbody>
                {jobs?.filter((job: Job) => ["CLOSED", "APPROVED"].includes(job.status)).map((job: Job) => {
                    return (
                        <tr key={job.id} className="align-middle">
                            <td>
                                {job.id}
                            </td>
                            <td>
                                {formatDate(job.bookedDate)}
                            </td>
                            <td>
                                {job.type}
                            </td>
                            <td>
                                <Button
                                    type="button"
                                    variant="btn-link"
                                    className="text-start"
                                    onClick={() => toggleRowExpansion(job.id)}
                                    aria-label={expandedRows[job.id] ? "Dölj alla meddelanden" : "Visa alla meddelanden"}>
                                    {
                                        expandedRows[job.id]
                                            ? <>{job.message} <ArrowDropUpIcon className="float-end"/></>
                                            : <>Visa alla meddelanden? <ArrowDropDownIcon className="float-end"/></>
                                    }
                                </Button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
        </>
    )
}