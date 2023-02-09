import meducate from "../assets/images/med-ucate.jpeg";
import gmho from "../assets/images/gmho.png";
import stemistry from "../assets/images/stemistry.jpg";

const Partners = () => {
  return (
    // <p>hi</p>

    // <div className='sponsorsFooter'>

    // <h2 >Our Sponsors</h2>
    // <ul>

    //     <li id="rcorners1"><img src="http://placehold.it/140x80/ccc/BBB&text=Company" /></li>

    //     <li id="rcorners1"><img src="http://placehold.it/140x80/ccc/BBB&text=Company" /></li>
    //     <li id="rcorners1"><img src="http://placehold.it/140x80/ccc/BBB&text=Company" /></li>

    //     <li id="rcorners1"><img src="http://placehold.it/140x80/ccc/BBB&text=Company" /></li>
    //     <li id="rcorners1"><img src="http://placehold.it/140x80/ccc/BBB&text=Company" /></li>
    //     <li id="rcorners1"><img src="http://placehold.it/140x80/ccc/BBB&text=Company" /></li>
    // </ul>
    // </div>
    // <div class="container-fluid" style="margin: 50px 0 ">
    <div class="container-fluid container">
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
