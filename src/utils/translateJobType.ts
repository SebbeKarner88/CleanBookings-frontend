export default function translateJobType(type: string) {
    switch (type) {
        case "BASIC_CLEANING": return "BASIC-städning";
        case "TOPP_CLEANING": return "TOPP-städning";
        case "WINDOW_CLEANING": return "Fönsterputs";
        case "DIAMOND_CLEANING": return "DIAMANT-städning";
    }
}