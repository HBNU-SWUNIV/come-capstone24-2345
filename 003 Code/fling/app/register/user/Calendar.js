import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';

const Calendar = (props) => {
  const years = Array.from({ length: 45 }, (_, i) => 1980 + i);
  const months = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ];

  const CustomButtonInput = ({ value, onClick }) => (
    <button type='button' className='w-full text-start' onClick={onClick}>
      {value || 'YYYY-MM-DD'}
    </button>
  );
  return (
    <>
      <DatePicker
        className='w-full'
        selected={props.userBirth}
        shouldCloseOnSelect
        locale={ko}
        dateFormat={'yyyy-MM-dd'}
        onChange={(date) => props.handleUserBirth(date)}
        customInput={<CustomButtonInput />}
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className='flex justify-center gap-[4px]'>
            <button
              type='button'
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
            >
              <img
                className='size-[18px] mr-[4px]'
                src='/direction/chevron-left.svg'
              />
            </button>
            <select
              className='rounded-[4px]'
              value={date.getFullYear()}
              onChange={({ target: { value } }) => changeYear(value)}
            >
              {years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <select
              className='rounded-[4px]'
              value={months[date.getMonth()]}
              onChange={({ target: { value } }) =>
                changeMonth(months.indexOf(value))
              }
            >
              {months.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <button
              type='button'
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
            >
              <img
                className='size-[18px] ml-[4px]'
                src='/direction/chevron-right-black.svg'
              />
            </button>
          </div>
        )}
      />
    </>
  );
};

export default Calendar;
