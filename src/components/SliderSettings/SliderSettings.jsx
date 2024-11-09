/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import "../../assets/styles/Activity.css";

const NextArrow = ({ onClick }) => {
  return (
    <button className="custom-arrow custom-next-arrow" onClick={onClick}>
      <MdKeyboardArrowRight size={24} />
    </button>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <button className="custom-arrow custom-prev-arrow" onClick={onClick}>
      <MdKeyboardArrowLeft size={24} />
    </button>
  );
};

// ** Slider Setting Start ** //
const postSliderSettings = () => {
  return ({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0',
    focusOnSelect: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  })
}
// ** Slider Setting End ** //

export default postSliderSettings;
