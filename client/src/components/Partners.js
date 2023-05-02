import meducate from "../assets/images/med-ucate.jpeg";
import gmho from "../assets/images/gmho.png";
import stemistry from "../assets/images/stemistry.jpg";

const Partners = () => {
  return (
    // <p>hi</p>
    <div
      class="container-fluid container"
      style={{ borderTop: "none", paddingBottom: "7rem", marginBottom: "8rem" }}
    >
      <h2 style={{ textAlign: "center" }}>Our Partners</h2>
      <div class="row_own">
        <span class="stat_box_own">
          <a
            href="https://www.med-ucate.org/"
            className="special-a"
            target="_blank"
          >
            <img src={meducate} />
          </a>
        </span>
        <span class="stat_box_own">
          <a
            href="https://www.globalmentalhealthoutreach.com/"
            className="special-a"
            target="_blank"
          >
            <img src={gmho} />
          </a>
        </span>
        <span class="stat_box_own">
          <a
            href="https://thestemistryproject.carrd.co/"
            className="special-a"
            target="_blank"
          >
            <img src={stemistry} />
          </a>
        </span>
      </div>
    </div>
  );
};
export default Partners;
