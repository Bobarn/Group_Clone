from flask import Blueprint, request
from app.models import db, ProductImage
from flask_login import current_user, login_required
from app.s3_helpers import (
    upload_file_to_s3, get_unique_filename)


image_routes = Blueprint("images", __name__)


@image_routes.route("", methods=["POST"])
@login_required
def upload_image():
    form = ImageForm()

    if form.validate_on_submit():

        image = form.data["image"]
        secondImage = form.data["secondImage"]

        if secondImage:
            secondImage.filename = get_unique_filename(secondImage.filename)
            upload2 = upload_file_to_s3(secondImage)

        thirdImage = form.data["thirdImage"]
        if thirdImage:
            thirdImage.filename = get_unique_filename(thirdImage.filename)
            upload3 = upload_file_to_s3(thirdImage)


        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        print(upload)

        if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message (and we printed it above)
            # return render_template("post_form.html", form=form, errors=[upload])
            return { "post_product_images": form.errors }

        url = upload["url"]
        url2 = upload2["url"]
        url3 = upload3["url"]
        new_image = Post(url=url, productId=int(id))
        db.session.add(new_image)
        db.session.commit()
        # return redirect("/posts/all")

    if form.errors:
        print(form.errors)
        return { "post_product_images": form.errors }


    return {"product": updated_product.to_dict()}
