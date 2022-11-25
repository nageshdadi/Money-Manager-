// Write your code here
import './index.css'

const TransactionItem = props => {
  const {eachHistory, deleteHistory} = props

  const {id, type, title, amount} = eachHistory

  const onClickDeleteIcon = () => {
    deleteHistory(id, type, amount)
  }

  return (
    <li className="listHistory">
      <p className="listPara">{title}</p>
      <p className="listPara">{amount}</p>
      <p className="listPara">{type}</p>
      <button
        testid="delete"
        className="deleteBtn"
        type="button"
        onClick={onClickDeleteIcon}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="deleteIcon"
        />
      </button>
    </li>
  )
}
export default TransactionItem
