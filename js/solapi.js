function btn_sendMessage_counselor() {
  let inquirer_name = document.getElementById('name').value;
  let counselor_name = "오종현";
  let tel = "01033528779";
  let templateId = "KA01TP2309120838479400wiZ0XnN1j6";
  let pfid = "KA01PF22041206411o33TFWW9Sl71Ppp";

  let now = new Date();
  let options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  let nowDate = now.toLocaleString(undefined, options);

  const text = document.getElementById("text").value;


  var selectedValue = document.getElementById('inquiryType').value;


  $.ajax({
    type: "POST",
    url: "/submit",
    data: $("#yourForm").serialize(),
  }).done(function (response) {

    if (response.success) {
      const id = response.id;

      // use the id to generate link
      let link = "port-0-daegu-zarip-center-sub-page-last-3prof2lll079qfg.sel4.cloudtype.app/?id=" + id;


      $.ajax({
        type: "POST",
        url: "/send-message-counselor",
        data: JSON.stringify({
          inquirer_name, counselor_name, tel, pfid,
          templateId,
          nowDate, text,
          selectedValue,
          link
        }),
        contentType: 'application/json',

      }).done(function (response) {
        if (response.success) { console.log("상담사에게 상담 신청이 완료되었습니다."); }
        else { console.log("상담사에게 상담 신청에 실패하였습니다. 다시 시도해주세요."); }

      });



    } else { console.log("Server did not return a success response"); }

  }).fail(function () { console.log("Ajax request failed"); });
}

function btn_sendMessage_customer() {
  let name = document.getElementById('name').value;
  let tel = document.getElementById('tel').value;
  let templateId = "KA01TP230912084203416iyD9IDvVF9r";
  let pfid = "KA01PF22041206411o33TFWW9Sl71Ppp";

  let selectedValue = document.getElementById('inquiryType').value;
  let link = "port-0-daegu-zarip-center-2rrqq2blmj97c9c.sel5.cloudtype.app"

  $.ajax({
    type: "POST",
    url: "/send-message-customer",
    data: JSON.stringify({ name, tel, pfid, templateId, selectedValue, link }),
    contentType: 'application/json',

  }).done(function (response) {
    if (response.success) { console.log("자립준비청년에게 상담 신청이 완료되었습니다."); }
    else { console.log("자립준비청년에게 상담 신청에 실패하였습니다. 다시 시도해주세요."); }

  });
};