import {useAppDispatch, useAppSelector} from '../app/hooks';
import {setVideos, setLoading} from '../store/data/dataSlice';

type Props = {};

export default function NotFound(props: Props): JSX.Element {
  return <div>404 Not Found!</div>;
}
