function callForms() {
  let oWay = document.getElementById("constructor");

  let sHtml = `<main>
    <div class="py-5 text-center">
      <h2>Ficha de cadastro</h2>
      <p class="lead">A gente só precisa de alguns dados seus, não se preocupe, garantimos a integridade e a segurança na hora do seu cadastro!</p>
    </div>

    <div class="row g-13">
      <div class="col-md-13 col-lg-14">
        <h4 class="mb-3">Cliente iLulu</h4>
        <form class="needs-validation" novalidate>
          <div class="row g-3">
            <div class="col-sm-6">
              <label for="firstName" class="form-label">Nome</label>
              <input type="text" class="form-control" id="firstName" placeholder="" value="" required>
              <div class="invalid-feedback">
                Precisamos do seu nome.
              </div>
            </div>

            <div class="col-sm-6">
              <label for="lastName" class="form-label">Sobrenome</label>
              <input type="text" class="form-control" id="lastName" placeholder="" value="" required>
              <div class="invalid-feedback">
               A gente entende, mas custa nada nos dizer né?!
              </div>
            </div>

            <div class="col-12">
              <label for="username" class="form-label">Como você quer ser conhecido(a)?</label>
              <div class="input-group has-validation">
                <span class="input-group-text">#</span>
                <input type="text" class="form-control" id="username" placeholder="Username" required>
              <div class="invalid-feedback">
                  A gente precisa se conhecer melhor
                </div>
              </div>
            </div>

            <div class="col-12">
              <label for="email" class="form-label">E-mail <span class="text-muted">(Por Favor)</span></label>
                <div class="input-group has-validation">
                    <input type="email" class="form-control" id="email" placeholder="you@example.com" required>
                    <div class="invalid-feedback">
                        A gente não manda SPAM, palavra de escoteiro!
                    </div>
                </div>
            </div>


            <div class="col-12">
              <label for="address2" class="form-label">Telefone <span class="text-muted">(Por Favor)</span></label>
              <input type="text" class="form-control" id="address2" placeholder="(xx) xxxxx-xxxx" required>
              <div class="invalid-feedback">
                A gente não liga nas horas chatas!
              </div>
            </div>

            <div class="col-md-5">
              <label for="country" class="form-label">País</label>
              <select class="form-select" id="country" required>
                <option value="">Escolha...</option>
                <option>Brasil</option>
                <option>Pernambuco (Só de greia)</option>
              </select>
              <div class="invalid-feedback">
                Pernambuco meu PAÍS!
              </div>
            </div>

            <div class="col-md-4">
              <label for="state" class="form-label">Estado</label>
              <select class="form-select" id="state" required>
                <option value="">Escolha...</option>
                <option>Pernambuco</option>
                <option>Paraiba</option>
                <option>Ceara</option>
                <option>Rio Grande do Norte</option>
              </select>
              <div class="invalid-feedback">
                Selecione um estado.
              </div>
            </div>

            <div class="col-md-3">
              <label for="zip" class="form-label">Cidade</label>
              <input type="text" class="form-control" id="zip" placeholder="" required>
              <div class="invalid-feedback">
                Diga ae a sua ré!
              </div>
            </div>
          </div>

          <hr class="my-4">

          <div class="form-group">
            <label for="description">Diga sua ideia que a gente trabalha em cima.</label>
            <textarea class="form-control" id="description" rows="6" required></textarea>
            <div class="invalid-feedback">
                Ai você me quebra!
            </div>
          </div>

          <hr class="my-4">
        </form>
        <button class="w-100 btn btn-primary btn-lg" type"submit" onclick="validateForm()" >Enviar</button>
        <p class="mt-5 mb-3 text-muted">&copy; 2021</p>
      </div>
    </div>
  </main>`;

  oWay.innerHTML = sHtml;

  (function () {
    "use strict";

    debugger;

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll(".needs-validation");

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        "click",
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add("was-validated");
        },
        false
      );
    });
  })();
}

function validateForm(event) {
  debugger;
  let aState = [];
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach((form) => {
    Array.prototype.slice.call(form).forEach((x) => {
      if (x.value === "") {
        aState.push(false);
      } else {
        aState.push(true);
      }
    });
    if (aState.every((x) => x === true)) {
      saveClient(forms);
    } else {
      callModalError();
      $("#ModalCreate").modal("show");
    }
  });
}

async function saveClient(aValue) {
  let aData;
  let oClient = { values: [] };

  aValue.forEach(function (x) {
    aData = Array.prototype.slice.call(x);
  });

  aData.forEach(function (x) {
    oClient.values.push(x.value);
  });

  oClient.name = oClient.values[0] + " " + oClient.values[1];
  oClient.nickName = oClient.values[2];
  oClient.email = oClient.values[3];
  oClient.phone = oClient.values[4];
  oClient.country = oClient.values[5];
  oClient.state = oClient.values[6];
  oClient.city = oClient.values[7];
  oClient.rule = oClient.values[8];

  await oDao
    .save(oClient)
    .then(() => {
      Array.prototype.slice.call(aValue).forEach(function (form) {
        form.removeEventListener("click", arguments.callee, true);
      });
      aData.forEach((x) => {
        x.value = "";
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function callModal(results) {
  let mWay = document.getElementById("mSave");
  let modal = `<div class="modal fade" id="ModalCreate" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Cadastro realizado com sucesso!</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
          <div class="mb-3 nome">
            <label class="nome" for="nome" class="col-form-label">Login:</label>
            <input type="text" class="form-control" id="nome" value="${results.login}" readonly>
          </div>
          <div class="mb-3 email">
            <label for="email" class="col-form-label">Chave de Acesso:</label>
            <input type="text" class="form-control" id="id" value="${results.key}" readonly>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" onclick="onCloseModal()">Ok</button>
      </div>
    </div>
  </div>
</div>`;
  //document.getElementById('ModalCreate').querySelector('.modal-title').textContent = `Novo(a) Cliente:`
  mWay.innerHTML = modal;
}

function callModalError() {
  let destination = document.getElementById("mSave");
  let modal = `<div class="modal fade" id="ModalCreate" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Verifique os Campos:</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <p>
        Existem campos em branco no formulário, favor verificar.
      </p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" onclick="onCloseModalError()">Ok</button>
      </div>
    </div>
  </div>
</div>`;
  //document.getElementById('ModalCreate').querySelector('.modal-title').textContent = `Novo(a) Cliente:`
  destination.innerHTML = modal;
}

function onCloseModal() {
  $("#ModalCreate").modal("hide");
  window.location.reload();
}

function onCloseModalError() {
  $("#ModalCreate").modal("hide");
}

function loginClient() {
  oWay = document.getElementById("constructor");

  sHtml = `
  <div class="py-5 text-center">
      <h2>Consultar pedidos</h2>
      <p class="lead">Aqui é onde você pode ter o panorama do seu pedido, prazo, valores e o principal, o status que é atualizado a cada modificação do designer.</p>
    </div>
  <div class="col-md-6 offset-md-3">
  <div class="form-signin">
  <form>
  <h1 class="h3 mb-3 fw-normal">Entre para continuar:</h1>

  <div class="form-floating">
    <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
    <label for="floatingInput">E-mail</label>
  </div>
  <div class="form-floating">
    <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
    <label for="floatingPassword">Chave de Acesso</label>
  </div>
</form>
<button class="w-100 btn btn-lg btn-primary" onclick="search()">Consultar</button>
  <p class="mt-5 mb-3 text-muted">&copy; 2021</p>
</div>
</div>
`;

  oWay.innerHTML = sHtml;
}

function search() {
  debugger;

  let oMail = document.getElementById("floatingInput").value;
  let oKey = document.getElementById("floatingPassword").value;

  if (
    oMail === "" ||
    oMail === null ||
    oKey === "" ||
    oKey === null ||
    oMail === undefined ||
    oKey === undefined
  ) {
    callModalError();
    $("#ModalCreate").modal("show");
  } else {
    oDao.search(oKey);
  }
}

function callModalReport(oFind) {
  let results;
  let modal;
  let mSucess = document.getElementById("mSave");

  if (oFind.status === "" || oFind.status === undefined) {
    results =
      "Seu pedido ainda não foi aprovado, mas não fique triste, assim que tiver tudo certo a gente te chama.";
    modal = `<div class="modal fade" id="ModalCreate" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Relatório Usuário: ${oFind.name}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <p>${results}</p>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-primary" onclick="onCloseModalReport()">Ok</button>
                      </div>
                    </div>
                  </div>
                </div>`;
  } else {
    results = oFind;
    modal = `<div class="modal fade" id="ModalCreate" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Relatório Usuário: ${oFind.name}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                      <div>
                        <p><h4>E-mail:</h4> ${results.email}</p>
                      </div>
                      <div>
                        <p><h4>Pedido:</h4> ${results.rule}</p>
                      </div>
                      <div>
                        <p><h4>* Status:</h4> ${results.resp}: ${results.status}</p>
                      </div>
                      <div>
                        <p><h4>Valor:</h4> ${results.amount}</p>
                      </div>
                      <div>
                        <p><h4>* Previsão de entrega:</h4> ${results.term}</p>
                      </div>
                      <br>
                      <footer>
                        <p><h6>Campos "Status" e "Previsão de entrega" podem ser modificados mediante a solicitação do cliente.</h6></p>
                      </footer>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-primary" onclick="onCloseModalReport()">Ok</button>
                      </div>
                    </div>
                  </div>
                </div>`;
  }
  //document.getElementById('ModalCreate').querySelector('.modal-title').textContent = `Novo(a) Cliente:`
  mSucess.innerHTML = modal;
}

function onCloseModalReport() {
  $("#ModalCreate").modal("hide");
  window.location.reload();
}
