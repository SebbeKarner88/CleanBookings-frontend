export default function translateJobType(type: string) {
    switch (type) {
        case "BASIC_CLEANING": return "Basic";
        case "TOPP_CLEANING": return "Top";
        case "WINDOW_CLEANING": return "Fönsterputs";
        case "DIAMOND_CLEANING": return "Diamond";  
    }
}