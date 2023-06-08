// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
 // {
 //   title: '출석 데이터',
 //   path: '/dashboard/attendance',
 //   icon: icon('ic_user'),
 // },
 // {
 //   title: '성적 데이터',
 //   path: '/dashboard/grade',
 //   icon: icon('ic_analytics'),
 // },
  {
    title: '로그인 페이지',
    path: '/login',
    icon: icon(''),
  }
];

export default navConfig;
