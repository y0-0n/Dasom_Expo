export function getData(arg) {
    const language = {
        ko: require('./data/lang/kor_new.json'),
        en: require('./data/lang/eng_new.json'),
        //th: require('./data/lang/th_new.json'),
        ru: require('./data/lang/ru_new.json')
    }
    let data = language[arg];
    return data;
}
export function getImage(arg) {
  const image = {
    Chest: require('./asset/img/2x/chest.png'),
    Throat: require('./asset/img/2x/throat.png'),
    Ear: require('./asset/img/2x/ear.png'),
    Eye: require('./asset/img/2x/eye.png'),
    Head: require('./asset/img/2x/head.png'),
    Mouth: require('./asset/img/2x/mouth.png'),
    Nose: require('./asset/img/2x/nose.png'),
    Tooth: require('./asset/img/2x/teeth.png'),
    Anus: require('./asset/img/2x/anus.png'),
    Arm: require('./asset/img/2x/arm.png'),
    Leg: require('./asset/img/2x/leg.png'),
    Stomach: require('./asset/img/2x/stomach.png'),
    Skin: require('./asset/img/2x/skin.png'),
    "Reproductive System for Female": require('./asset/img/2x/female.png'),
    "Reproductive System for Male": require('./asset/img/2x/male.png'),
    Urology: require('./asset/img/2x/urine.png'),
  }
  let img = image[arg];
  return img;
}
