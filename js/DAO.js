const oDao = {};

let oList = {};

let oClient;

(function () {
  function geraStringAleatoria(tamanho) {
    var stringAleatoria = "";
    var caracteres =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@!*&%";
    for (var i = 0; i < tamanho; i++) {
      stringAleatoria += caracteres.charAt(
        Math.floor(Math.random() * caracteres.length)
      );
    }
    return stringAleatoria;
  }

  async function save(oClient) {
    debugger;

    id_client = geraStringAleatoria(12);

    let updates = {};

    oClient.key = id_client;

    updates["/clients/" + id_client] = oClient;

    let data_ref = firebase.database().ref();

    data_ref
      .update(updates)
      .then(() => {
        console.log({ success: true, message: "Client is saved" });
        let results = {
          login: oClient.email,
          key: id_client,
          success: true,
          message: `Client ${oClient.name} is saved!`,
        }
        callModal(results);
        $("#ModalCreate").modal("show");
      })
      .catch((error) => {
        console.log({
          success: false,
          message: `Client is not saved: ${error}`,
        });
        return {
          success: false,
          message: `Client is not saved: ${error}`,
        };
      });
  }

  function search(value) {
    data_ref = firebase.database().ref("/clients/" + value);

    data_ref.on("value", (snapshot) => {
      callModalReport (snapshot.val());
      $("#ModalCreate").modal("show");
    }),
      (error) => {
        console.log({
          success: false,
          message: `Client is not exists: ${error.name}`,
        });
      };
  }

  function edit(value, oClient) {
    data_ref = firebase.database().ref("/clients" + value);

    data_ref
      .update(oClient)
      .then(() => {
        return console.log({ success: true, message: "Client is saved" });
      })
      .catch((error) => {
        return console.log({
          success: false,
          message: `Client is not saved: ${error}`,
        });
      });
  }

  function remove(value) {
    data_ref = firebase.database().ref("/clients/" + value);

    data_ref
      .remove()
      .then(() => {
        return {
          success: true,
          message: `Registro ${value}, removido com sucesso`,
        };
      })
      .catch(() => {
        return {
          sucess: false,
          message: `Não foi possivel remover o registro ${value}`,
        };
      });
  }

  function list() {
    debugger;

    data_ref = firebase.database().ref().child("clients");

    data_ref.on("value", (snapshot) => {
      oList = snapshot.val();
    }),
      (error) => {
        console.log({
          success: false,
          message: `Client is not exists: ${error.name}`,
        });
      };
  }

  oDao.save = save;
  oDao.search = search;
  oDao.edit = edit;
  oDao.remove = remove;
  oDao.list = list;
})();
