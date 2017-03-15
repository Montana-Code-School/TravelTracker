import { extendObservable } from 'mobx';

export default class ImageStore {
  constructor  () {
    extendObservable(this, {
      images: []
    });
    this.addNewImage = this.addNewImage.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
  }

  setImages(images) {
    this.images = images;
  }

  addNewImage(img) {
    fetch('/api/giphys', {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({
         name: img.name,
         url: img.url,
         description: img.description,
         owner: img.owner
      })
    })
    .then(function(result) {return result.json();})
    .then(image => {
      let allImages = this.images;
      allImages.push(image);
      this.images = allImages;
    });
  }

  deleteImage(img) {
    let allImages=this.images.slice();
    allImages=allImages.filter(i => img._id !==i._id);
    this.images = allImages;
    fetch(`/api/giphys/${img._id}`, {
       method: 'DELETE'
    });
  }
}
