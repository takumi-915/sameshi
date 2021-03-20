import firebase from "./firebase.js";

export function upload(file, serviceID) {
  const imageURL = `image/${serviceID}`
  return firebase.storage().ref().child(imageURL).put(file,
    function (error) {
      if (error) {
        // The write failed...
        alert('画像のアップロードに失敗しました');
        console.log(error);
      } else {
        console.log("画像のアップロードに成功しました!")
      }
    })
}

export function download(title) {
  const imageURL = `image/${title}`
  return firebase.storage().ref().child(imageURL).getDownloadURL(
    function (error) {
      if (!error) {
        alert('画像のダウンロードに失敗しました');
        console.log(error)
      } else {
        console.log("Download URL successfully!")
      }
    }
  )
}
