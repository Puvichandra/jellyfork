import Frame from "../components/card/Frame";
import carddata from "../data/carddata"

function DappMakerPage() {

    function createCard(carddata) {
        return (
          
          <Frame
            key={carddata.id}
            name={carddata.name}
            imgURL1={carddata.imgURL1}
            imgURL2={carddata.imgURL2}
            imgURL3={carddata.imgURL3}
            imgURL4={carddata.imgURL4}
            description={carddata.description}
            beforePrice={carddata.beforePrice}
            afterPrice={carddata.afterPrice}
            timePeriod={carddata.timePeriod}
            link={carddata.link}
          />
       
        );
      }
    return <>


      
     <div  className="max-w-6xl  rounded-2xl  mx-auto    py-5">
     <div className="text-4xl font-poppins font-bold text-white">
      <p>  Dapp Maker</p>
     </div>
    <div className="flex flex-row flex-wrap justify-center gap-10 py-10">
   {carddata.map(createCard)}
        </div>
        </div>
    </>
}

export default DappMakerPage