import { useContext } from 'react'
import { formatDistanceToNow } from 'date-fns'
import enUS from 'date-fns/locale/en-US'
import { CyclesContext } from '../../contexts/CyclesContext'
import {
  EmptyHistoryListContainer,
  HistoryContainer,
  HistoryList,
  Status,
} from './styles'
import { ClipboardText } from 'phosphor-react'

export function History() {
  const { cycles } = useContext(CyclesContext)

  return (
    <HistoryContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ rotate: 0 }}
      transition={{ duration: 1, type: 'spring' }}
    >
      <h1>My History</h1>

      {cycles.length ? (
        <HistoryList>
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Duration</th>
                <th>Start</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {cycles.map((cycle) => {
                return (
                  <tr key={cycle.id}>
                    <td>{cycle.task}</td>
                    <td>{cycle.minutesAmount} minutes</td>
                    <td>
                      {formatDistanceToNow(new Date(cycle.startDate), {
                        addSuffix: true,
                        locale: enUS,
                      })}
                    </td>
                    <td>
                      {cycle.finishedDate && (
                        <Status statusColor="blue">Concluded</Status>
                      )}

                      {cycle.interruptedDate && (
                        <Status statusColor="red">Interrupted</Status>
                      )}

                      {!cycle.finishedDate && !cycle.interruptedDate && (
                        <Status statusColor="yellow">In progress</Status>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </HistoryList>
      ) : (
        <EmptyHistoryListContainer>
          <ClipboardText size={120} weight="duotone" />
          <p>The list is empty. Start a timer to get history here.</p>
        </EmptyHistoryListContainer>
      )}
    </HistoryContainer>
  )
}
