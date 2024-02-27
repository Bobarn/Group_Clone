from app.models import db, ProductImage, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker

f = Faker(locale='en_US')

all_imgs = [ "",
"https://i.etsystatic.com/35046319/c/1999/1999/0/1/il/37da2d/4437850362/il_600x600.4437850362_7004.jpg",
'https://i.etsystatic.com/20414588/c/2000/2000/0/272/il/ee203d/5167304835/il_600x600.5167304835_aj9y.jpg',
'https://i.etsystatic.com/27519419/c/2112/1677/453/616/il/1b2443/3522827430/il_340x270.3522827430_lo4f.jpg',
'https://i.etsystatic.com/45092666/r/il/f60df6/5248961368/il_600x600.5248961368_4nds.jpg',
'https://i.etsystatic.com/35218550/r/il/07be49/5292227301/il_1588xN.5292227301_td8b.jpg',
'https://i.etsystatic.com/20920358/r/il/b85db3/5556245301/il_1588xN.5556245301_oars.jpg',
"https://i.etsystatic.com/37261225/c/1512/1512/0/0/il/f1ae40/5339959027/il_600x600.5339959027_lltt.jpg",
'https://i.etsystatic.com/49428303/r/il/4e8299/5700273007/il_600x600.5700273007_ffj9.jpg',
'https://i.etsystatic.com/31683776/c/1291/1291/256/0/il/028f4e/4930164260/il_600x600.4930164260_2lus.jpg',
'https://i.etsystatic.com/25026240/r/il/977a8c/3921381482/il_600x600.3921381482_gaih.jpg',
'https://i.etsystatic.com/48981120/r/il/23ce45/5674780157/il_1588xN.5674780157_743f.jpg',
'https://i.etsystatic.com/11947825/r/il/2f161b/4860941285/il_1588xN.4860941285_7552.jpg',
"https://i.etsystatic.com/22470627/c/2000/2000/500/0/il/7e50c1/5094495929/il_600x600.5094495929_l8ee.jpg",
'https://i.etsystatic.com/49381443/r/il/a8d53e/5689846824/il_600x600.5689846824_3nxb.jpg',
'https://i.etsystatic.com/44170382/r/il/a5f4ae/5424644094/il_600x600.5424644094_sdos.jpg',

'https://i.etsystatic.com/22059251/r/il/b603be/5732923183/il_600x600.5732923183_6xwz.jpg',
'https://i.etsystatic.com/27005739/c/2250/2250/375/0/il/77842b/3751624698/il_600x600.3751624698_cwve.jpg',
'https://i.etsystatic.com/10382984/r/il/9a9660/4111336952/il_340x270.4111336952_4sgd.jpg',
"https://i.etsystatic.com/10204022/c/1657/1657/630/722/il/44f1e3/3200668113/il_600x600.3200668113_ewcj.jpg",
'https://i.etsystatic.com/26347816/r/il/bac58d/5596699978/il_600x600.5596699978_kjfv.jpg',
'https://i.etsystatic.com/21776707/r/il/cddb68/4942595586/il_600x600.4942595586_95e8.jpg',
'https://i.etsystatic.com/19586615/r/il/ccdb76/5579411499/il_600x600.5579411499_1bcr.jpg',
'https://i.etsystatic.com/39860855/r/il/823e22/5274200858/il_600x600.5274200858_mp2y.jpg',
"https://i.etsystatic.com/37391002/r/il/281747/4739621681/,il_600x600.4739621681_jl0i.jpg",
'https://i.etsystatic.com/15688924/r/il/0668fc/5238933069/il_600x600.5238933069_54mt.jpg',
'https://i.etsystatic.com/32334657/r/il/e145fe/5442808222/il_600x600.5442808222_kag4.jpg',
'https://i.etsystatic.com/33549553/r/il/079ed5/5368859084/il_340x270.5368859084_st87.jpg',
'https://i.etsystatic.com/9838368/r/il/5d8501/5480247530/il_600x600.5480247530_es09.jpg',
'https://i.etsystatic.com/18976264/r/il/05851b/5557057670/il_600x600.5557057670_nsna.jpg',
"https://i.etsystatic.com/27896135/r/il/7fc8db/3129557813/il_600x600.3129557813_457i.jpg",

'https://i.etsystatic.com/37812077/r/il/333dfc/5660677188/il_600x600.5660677188_kkiw.jpg',
'https://i.etsystatic.com/23069228/r/il/24648b/3767103826/il_600x600.3767103826_pw2e.jpg',
'https://i.etsystatic.com/28952878/r/il/074678/4608586198/il_600x600.4608586198_j85a.jpg',
'https://i.etsystatic.com/28658784/c/1296/1296/0/69/il/9759fa/5540954903/il_600x600.5540954903_7jo4.jpg',
'https://i.etsystatic.com/35292923/r/il/3ee4f0/5592372967/il_600x600.5592372967_89c1.jpg',
"https://i.etsystatic.com/42307485/r/il/e3bf49/4798440118/il_600x600.4798440118_fxsp.jpg",

'https://i.etsystatic.com/36691705/c/2154/2154/0/0/il/382ed4/4997783760/il_600x600.4997783760_oiyt.jpg',

'https://i.etsystatic.com/40885886/c/2106/2106/56/0/il/531631/5100967404/il_600x600.5100967404_pv5q.jpg',
'https://i.etsystatic.com/35966576/c/2000/2000/552/0/il/4919ca/5433949902/il_600x600.5433949902_u1s2.jpg',
'https://i.etsystatic.com/35966576/c/2000/2000/552/0/il/4919ca/5433949902/il_600x600.5433949902_u1s2.jpg',
'https://i.etsystatic.com/41544315/r/il/5d42ad/4717309769/il_1588xN.4717309769_7muk.jpg',
'https://i.etsystatic.com/18173465/r/il/382ec5/3622907819/il_340x270.3622907819_88h4.jpg',
"https://i.etsystatic.com/12694448/r/il/c9e3b1/5296071901/il_1588xN.5296071901_gokd.jpg",
'https://i.etsystatic.com/48261001/r/il/8f6ebb/5581371396/il_600x600.5581371396_6ens.jpg',
'https://i.etsystatic.com/32444416/r/il/9452c7/5103094473/il_600x600.5103094473_gb58.jpg',
'https://i.etsystatic.com/16782045/r/il/323ae3/3128149146/il_1588xN.3128149146_ik9f.jpg',
'https://i.etsystatic.com/8098311/r/il/44002d/5192667760/il_1588xN.5192667760_2rwj.jpg',
'https://i.etsystatic.com/40515316/r/il/7e98a5/5053274933/il_1588xN.5053274933_r1at.jpg',
"https://i.etsystatic.com/8237457/r/il/fd3ed0/3788527280/il_1588xN.3788527280_53h3.jpg",
'https://i.etsystatic.com/8489917/c/1311/1311/0/0/il/41eebb/1177582438/il_600x600.1177582438_17hk.jpg',
'https://i.etsystatic.com/19989255/r/il/fc79cf/4002246518/il_1588xN.4002246518_o1go.jpg',
'https://i.etsystatic.com/25118925/r/il/58a288/4630889469/il_1588xN.4630889469_h493.jpg',
'https://i.etsystatic.com/14328097/r/il/85c780/3093033285/il_1588xN.3093033285_fipq.jpg',
'https://i.etsystatic.com/18188871/r/il/36b680/4046747454/il_600x600.4046747454_6urd.jpg',
"https://i.etsystatic.com/43275941/c/2410/2410/88/0/il/7e4623/5390287627/il_600x600.5390287627_kjnk.jpg",
'https://i.etsystatic.com/35505439/r/il/b71a9a/4342249856/il_340x270.4342249856_rmrk.jpg',
'https://i.etsystatic.com/35143523/r/il/cc40e3/5428869615/il_680x540.5428869615_fqhd.jpg',
'https://i.etsystatic.com/25118925/r/il/18010c/5410090583/il_340x270.5410090583_mh4b.jpg',
'https://i.etsystatic.com/31847164/r/il/737150/4856622055/il_600x600.4856622055_8kin.jpg',
'https://i.etsystatic.com/26339049/r/il/2d5743/3039223065/il_600x600.3039223065_qmbj.jpg',
]


def seed_product_images():
    allImages = []

    for i in range(1, 61):
        newImage = ProductImage(
            url=all_imgs[i],
            productId=i,
            image_name=f'product_image_{i}',
            preview=True
        )


        allImages.append(newImage)

    db.session.add_all(allImages)
    db.session.commit()

def undo_product_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.product_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM product_images"))

    db.session.commit()
