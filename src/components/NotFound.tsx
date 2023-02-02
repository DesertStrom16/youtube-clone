import {useAppDispatch, useAppSelector} from '../app/hooks';
import {setControllers, setLoading} from '../store/data/dataSlice';
// import {fetchControllers} from '../helper/API';

type Props = {};

export default function NotFound(props: Props): JSX.Element {
  return <div>404 Not Found!</div>;
}
