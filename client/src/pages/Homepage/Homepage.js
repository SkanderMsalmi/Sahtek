import SectionButtons from "../index-sections/SectionButtons";
import SectionNavbars from "../index-sections/SectionNavbars";
import SectionNavigation from "../index-sections/SectionNavigation";
import SectionProgress from "../index-sections/SectionProgress";
import SectionNotifications from "../index-sections/SectionNotifications";
import SectionTypography from "../index-sections/SectionTypography";
import SectionJavaScript from "../index-sections/SectionJavaScript";
import SectionCarousel from "../index-sections/SectionCarousel";
import SectionNucleoIcons from "../index-sections/SectionNucleoIcons";
import SectionDark from "../index-sections/SectionDark";
import SectionLogin from "../index-sections/SectionLogin";
import SectionExamples from "../index-sections/SectionExamples";
import SectionDownload from "../index-sections/SectionDownload";

function Homepage(){
    return   <div className="main">
    <SectionButtons />
    <SectionNavbars />
    <SectionNavigation />
    <SectionProgress />
    <SectionNotifications />
    <SectionTypography />
    <SectionJavaScript />
    <SectionCarousel />
    <SectionNucleoIcons />
    <SectionDark />
    <SectionLogin />
    <SectionExamples />
    <SectionDownload />
  </div>;
}

export default Homepage;