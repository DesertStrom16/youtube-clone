import {useAppDispatch, useAppSelector} from '../app/hooks';
import {setControllers, setLoading} from '../store/data/dataSlice';
// import {fetchControllers} from '../helper/API';

type Props = {};

export default function Home(props: Props): JSX.Element {
  return <div>Hello, World.</div>;
}
