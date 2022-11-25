// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {eachOption} = props

  const {optionId, displayText} = eachOption

  return <option value={optionId}>{displayText}</option>
}
export default MoneyDetails
