import React from "react";
import FinalResult from "./_components/FinalResult";
import { exampleTournamentResults } from "@/store/tournament";

export default function TournamentDetailPage() {
    return(
        <FinalResult data={exampleTournamentResults} />
    )
}