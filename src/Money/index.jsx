import moneyInput from './MoneyInput';
import moneyShow from './MoneyShow';

function set(decimal = 1) {
  const MoneyInput = moneyInput(decimal);
  const MoneyShow = moneyShow(decimal);

  return { MoneyInput, MoneyShow };
}
export default { set };
