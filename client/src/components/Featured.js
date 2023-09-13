import pleasweekly from "../assets/images/pleasweekly.png";
import onedublin from "../assets/images/onedublin.png";
import ghmopodcast from "../assets/images/gmhopodcast.jpeg";
import kpix from "../assets/images/cbs.png";
import patch from "../assets/images/patch.png";

const Featured = () => {
  return (
    <div
      class="container-fluid container"
      style={{ paddingBottom: "0rem", borderBottom: "none" }}
    >
      <h2 style={{ textAlign: "center" }}>Media Features</h2>
      <div class="row_own2">
        <span class="stat_box_own3">
          <a
            href="https://www.cbsnews.com/sanfrancisco/news/east-bay-high-school-student-develops-app-for-people-to-talk-about-their-alcohol-stories/"
            className="special-a"
            target="_blank"
          >
            <img src={kpix} />
          </a>
        </span>
        <span class="stat_box_own3">
          <a
            href="https://pleasantonweekly.com/news/2023/03/20/dublin-students-launch-support-app-for-teenage-substance-abuse"
            className="special-a"
            target="_blank"
          >
            <img src={pleasweekly} />
          </a>
        </span>
        <span class="stat_box_own3">
          <a
            href="https://open.spotify.com/episode/1W1TjhGpgoYAmabLUWjZjZ"
            className="special-a"
            target="_blank"
          >
            <img src={ghmopodcast} />
          </a>
        </span>
        <span class="stat_box_own3">
          <a
            href="https://onedublin.org/2023/02/06/myalcoholstory-a-student-founded-organization-dedicated-to-addressing-teen-alcoholism/"
            className="special-a"
            target="_blank"
          >
            <img src={onedublin} />
          </a>
        </span>
        <span class="stat_box_own3">
          <a
            href="https://patch.com/california/dublin/dublin-students-launch-website-teens-suffering-alcohol-abuse"
            className="special-a"
            target="_blank"
          >
            <img src={patch} />
          </a>
        </span>
      </div>
    </div>
  );
};
export default Featured;
