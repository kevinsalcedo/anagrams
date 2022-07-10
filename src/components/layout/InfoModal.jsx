import StatTile from "./StatTile";
import { affirmations } from "../../assets/affirmations";
function InfoModal({ stats }) {
  if (stats == null) {
    return <div>Loading...</div>;
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
                  key='streaks'
                  items={[
                    { title: "CURRENT STREAK", value: stats.currentStreak },
                    { title: "BEST STREAK", value: stats.bestStreak },
                  ]}
                  padHeight
                />
                <StatTile
                  key='hints'
                  items={[
                    { title: "AVG HINTS/WORD", value: stats.avgHints },
                    { title: "HINTS USED", value: stats.totalHints },
                  ]}
                  padHeight
                />
                <StatTile
                  key='words'
                  items={[
                    {
                      title: "PAIRS COMPLETED",
                      value: stats.numCompleted,
                    },
                    { title: "WORDS SKIPPED", value: stats.numSkipped },
                  ]}
                  padHeight
                />
                <StatTile
                  key='affirmations'
                  items={[
                    {
                      title:
                        affirmations[
                          Math.floor(Math.random() * affirmations.length)
                        ].toUpperCase(),
                    },
                  ]}
                />
              </div>
            </div>
          )}

          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-secondary'
              data-bs-dismiss='modal'
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoModal;
