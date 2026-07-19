import { useState } from "react";
import CafeInfo from "../CafeInfo/CafeInfo";
import css from "./App.module.css";
import type { Votes, VoteType } from "../../types/votes";
import VoteOptions from "../VoteOptions/VoteOptions";
import VoteStats from "../VoteStats/VoteStats";
import Notification from "../Notification/Notification";

const initVotes: Votes = {
  good: 0,
  neutral: 0,
  bad: 0,
};

function App() {
  //states
  const [votes, setVotes] = useState<Votes>(initVotes);

  //handlers
  function handleVote(type: VoteType) {
    const newVotes = {
      ...votes,
      [type]: votes[type] + 1,
    };
    setVotes(newVotes);
  }
  function resetVotes() {
    setVotes(initVotes);
  }

  //util
  function nonZeroVotes(): boolean {
    const nonZeroes = Object.values(votes).filter((value) => value > 0).length;
    return nonZeroes > 0;
  }
  function getTotalVotes(): number {
    return Object.values(votes).reduce((acc, val) => acc + val, 0);
  }
  function getPositiveRate() {
    const totalVotes = getTotalVotes();
    return totalVotes ? Math.round((votes.good / totalVotes) * 100) : 0;
  }

  //render
  return (
    <div className={css.app}>
      <CafeInfo />
      <VoteOptions
        onVote={handleVote}
        onReset={resetVotes}
        canReset={nonZeroVotes()}
      />

      {nonZeroVotes() ? (
        <VoteStats
          votes={votes}
          totalVotes={getTotalVotes()}
          positiveRate={getPositiveRate()}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}

export default App;
