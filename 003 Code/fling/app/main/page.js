import Match from './Match';
import Review from './Review';
import UserCheck from './UserCheck';

export default function Main() {
  return (
    <div className='size-full overflow-y-scroll pb-[100px]'>
      <div className='flex flex-col items-center'>
        <Match />

        <UserCheck />

        <Review />
      </div>
    </div>
  );
}
