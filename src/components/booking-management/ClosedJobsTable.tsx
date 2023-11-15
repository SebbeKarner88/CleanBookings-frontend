import {Button, Table} from "react-bootstrap";
import {useState} from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import formatDate from "../../utils/formatDate.ts";
import translateJobType from "../../utils/translateJobType.ts";
import convertTimeslot from "../../utils/convertTimslot.ts";

export interface Job {
    id: string;
    bookedDate: string;
    timeslot: string;
    type: string;
    message: string;
    status: string;
}

interface IClosedJobsTable {
    jobs: Job[] | undefined;
}

export default function ClosedJobsTable({jobs}: IClosedJobsTable) {
    const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

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
                        Boknings-ID
                    </th>
                    <th>
                        Datum
                    </th>
                    <th>
                        Tid
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
                                {convertTimeslot(job.timeslot)}
                            </td>
                            <td>
                                {translateJobType(job.type)}
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
                                            ? <>{job.message ? job.message : "Inga Meddelanden"} <ArrowDropUpIcon className="float-end"/></>
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