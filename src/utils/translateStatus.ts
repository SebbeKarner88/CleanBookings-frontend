export default function translateStatus(status: string) {
    switch (status) {
        case "OPEN": return "Ingen städare tilldelad";
        case "ASSIGNED": return "Städare tilldelad";
        case "WAITING_FOR_APPROVAL": return "Väntar på godkännande";
        case "NOT_APPROVED": return "Ej godkänt resultat"
        case "APPROVED": return "Godkänt resultat"
        case "CLOSED": return "Ärendet avslutat"
    }
}