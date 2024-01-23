import { useNavigate } from "react-router-dom";
import CategoryProducts from "../CategoryProducts/CategoryProduts";

function CategoryImages(){

    const navigate = useNavigate()





    return (
        <div className='category-main-cont'>
            <div className='single-cat-main-cont' onClick={() => navigate(`category/${'Jewelry'}`)}>
                <div className='cat-single-img-cont'>
                    <img className='cat-single-img'src='https://i.etsystatic.com/26211257/c/1935/1935/494/101/il/13828f/5389782444/il_300x300.5389782444_grtt.jpg' />
                </div>
                <span>Jewelry</span>

            </div>

            <div className='single-cat-main-cont' onClick={() => navigate(`category/${'Clothes'}`)}>
                <div className='cat-single-img-cont'>
                    <img className='cat-single-img'src='https://i.etsystatic.com/24645705/r/il/da205c/4495098223/il_300x300.4495098223_i07f.jpg' />
                </div>
                <span>Clothing</span>

            </div>
            <div className='single-cat-main-cont' onClick={() => navigate(`category/${'Art'}`)}>
                <div className='cat-single-img-cont'>
                    <img className='cat-single-img'src='https://i.etsystatic.com/30785973/c/2529/2008/234/74/il/676f1b/5710157185/il_340x270.5710157185_sdxq.jpg' />
                </div>
                <span>Art</span>

            </div>
            <div className='single-cat-main-cont' onClick={() => navigate(`category/${'Art Supplies'}`)}>
                <div className='cat-single-img-cont'>
                    <img className='cat-single-img'src='https://i.etsystatic.com/14774347/r/il/08174c/3684869628/il_300x300.3684869628_mkgw.jpg' />
                </div>
                <span>Art Supplies</span>

            </div>


            <div className='single-cat-main-cont' onClick={() => navigate(`category/${'Electronics'}`)}>
                <div className='cat-single-img-cont'>
                    <img className='cat-single-img'src='https://i.etsystatic.com/39860855/r/il/823e22/5274200858/il_300x300.5274200858_mp2y.jpg' />
                </div>
                <span>Electronics</span>

            </div>
            <div className='single-cat-main-cont' onClick={() => navigate(`category/${'Pet Supplies'}`)}>
                <div className='cat-single-img-cont'>
                    <img className='cat-single-img'src='https://i.etsystatic.com/23904858/r/il/f8b62e/4967956439/il_300x300.4967956439_i4lp.jpg' />
                </div>
                <span>Pet Supplies</span>

            </div>

        </div>
    )

}

export default CategoryImages
