import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'

import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    transactionHistoryList: [],
    title: '',
    type: 'INCOME',
    amount: '',
    yourBalance: 0,
    yourExpenses: 0,
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amount: parseInt(event.target.value)})
  }

  onChangeType = event => {
    this.setState({type: event.target.value})
  }

  addHistoryAndMoney = event => {
    event.preventDefault()
    const {title, amount, type} = this.state

    const newHistory = {
      id: uuidv4(),
      title,
      amount,
      type,
    }

    if (type === 'INCOME') {
      this.setState(prevState => ({
        transactionHistoryList: [
          ...prevState.transactionHistoryList,
          newHistory,
        ],
        title: '',
        amount: '',
        type: 'INCOME',
        yourBalance: prevState.yourBalance + newHistory.amount,
      }))
    } else {
      this.setState(prevState => ({
        transactionHistoryList: [
          ...prevState.transactionHistoryList,
          newHistory,
        ],
        title: '',
        amount: 0,
        type: 'INCOME',
        yourExpenses: prevState.yourExpenses + newHistory.amount,
        yourBalance: prevState.yourBalance - newHistory.amount,
      }))
    }
  }

  deleteHistory = (id, type, amount) => {
    const {transactionHistoryList} = this.state

    const remainHistoryList = transactionHistoryList.filter(
      eachHistory => eachHistory.id !== id,
    )

    if (type === 'INCOME') {
      this.setState(prevState => ({
        transactionHistoryList: remainHistoryList,
        yourBalance: prevState.yourBalance - amount,
      }))
    } else {
      this.setState(prevState => ({
        transactionHistoryList: remainHistoryList,
        yourExpenses: prevState.yourExpenses - amount,
      }))
    }
  }

  render() {
    const {
      transactionHistoryList,
      yourBalance,
      yourExpenses,
      amount,
      title,
    } = this.state

    const yourIncome = yourBalance + yourExpenses

    console.log(transactionHistoryList)

    return (
      <div className="bgContsiner">
        <div className="topCard">
          <h1>Hi, Richard</h1>
          <p>
            Welcome back to your{' '}
            <spna className="spanMoney">Money Manager</spna>
          </p>
        </div>
        <div className="balanceCard">
          <div className="yourBalanceCard">
            <img
              src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
              alt="balance"
              className="yourBal"
            />
            <div>
              <p className="para">Your Balance</p>
              <p testid="balanceAmount" className="headBal">
                Rs {yourBalance}
              </p>
            </div>
          </div>
          <div className="yourBalanceCard income">
            <img
              src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
              alt="income"
              className="yourBal"
            />
            <div>
              <p className="para">Your Income</p>
              <p testid="incomeAmount" className="headBal">
                Rs {yourIncome}
              </p>
            </div>
          </div>
          <div className="yourBalanceCard Expenses">
            <img
              src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
              alt="expenses"
              className="yourBal"
            />
            <div>
              <p className="para">Your Expenses</p>
              <p testid="expensesAmount" className="headBal">
                Rs {yourExpenses}
              </p>
            </div>
          </div>
        </div>
        <div className="bottomCard">
          <form className="form-card" onSubmit={this.addHistoryAndMoney}>
            <h3>Add Transaction</h3>
            <label htmlFor="title">TITLE</label>
            <br />
            <input
              id="title"
              type="text"
              onChange={this.onChangeTitle}
              value={title}
            />
            <br />
            <label htmlFor="amount">AMOUNT</label>
            <br />
            <input
              id="amount"
              type="text"
              onChange={this.onChangeAmount}
              value={amount}
            />
            <br />
            <label htmlFor="type">TYPE</label>
            <br />
            <select
              placeholder=""
              className="tranjectionCard"
              onChange={this.onChangeType}
            >
              {transactionTypeOptions.map(eachOption => (
                <MoneyDetails
                  eachOption={eachOption}
                  key={eachOption.optionId}
                />
              ))}
            </select>
            <br />
            <button className="button" type="submit">
              Add
            </button>
          </form>
          <div className="historyCard">
            <h1 className="historyHead">History</h1>
            <ul className="ulListCard">
              <li className="listHistory">
                <p className="listPara">Title</p>
                <p className="listPara">Amount</p>
                <p className="listPara">Type</p>
              </li>
              {transactionHistoryList.map(eachHistory => (
                <TransactionItem
                  eachHistory={eachHistory}
                  key={eachHistory.id}
                  deleteHistory={this.deleteHistory}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default MoneyManager
