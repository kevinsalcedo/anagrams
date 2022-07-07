import { useEffect, useState } from "react";
import { getStats } from "../../utils/wordUtils";
import StatTile from "./StatTile";
function InfoModal() {
  const [list, setList] = useState("sevens");
  const [stats, setStats] = useState({
    numCompleted: 0,
    numSkipped: 0,
    totalHints: 0,
    avgHints: 0,
    numWords: 0,
    currentStreak: 0,
    bestStreak: 0,
  });

  useEffect(
    function () {
      let newStats = getStats(list);
      setStats(newStats);
    },
    [list]
  );

  function changeList(val) {
    setList(val);
  }

  return (
    <div
      className='modal fade modal-centered'
      id='infoModal'
      tabIndex='-1'
      aria-labelledby='infoModal'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content jopert'>
          <div className='modal-header'>
            <h5 className='modal-title' id='infoModalLabel'>
              YOUR STATS
            </h5>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
            ></button>
          </div>

          {stats && (
            <div className='modal-body'>
              <div className='d-flex p-1 flex-column align-items-center'>
                <StatTile
                  items={[
                    { title: "CURRENT STREAK", value: stats.currentStreak },
                    { title: "BEST STREAK", value: stats.bestStreak },
                  ]}
                  padHeight
                />
                <StatTile
                  items={[
                    {
                      title: "PAIRS COMPLETED",
                      value: "25",
                    },
                  ]}
                  padHeight
                />
                <StatTile items={[{ title: "YOUR OUTFIT TODAY: 15/10" }]} />
              </div>
            </div>
          )}

          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-secondary'
              data-bs-dismiss='modal'
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoModal;
