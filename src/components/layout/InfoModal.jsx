import StatTile from "./StatTile";
import { affirmations } from "../../assets/affirmations";
import { getDay } from "../../utils/wordUtils";
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
function InfoModal({ stats, show, setShow }) {
  if (stats == null) {
    return <></>;
  }
  return (
    <Modal
      show={show} onHide={() => setShow(false)}
      id='infoModal'
      aria-labelledby='infoModal'
      aria-hidden='true'
      centered
    >
        <Container className='jopert'>
          <Modal.Header>
            <h5 className='modal-title' id='infoModalLabel'>
              YOUR STATS
            </h5>
          </Modal.Header>

          {stats && (
            <Modal.Body className='modal-body'>
              <Container className='d-flex p-1 flex-column align-items-center'>
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
                          getDay() % affirmations.length
                        ].toUpperCase(),
                    },
                  ]}
                />
              </Container>
            </Modal.Body>
          )}

          <Modal.Footer>
            <Button
              type='button'
              className='btn-secondary'
              onClick={() => setShow(false)}
            >
              CLOSE
            </Button>
          </Modal.Footer>
        </Container>
    </Modal>
  );
}

export default InfoModal;
