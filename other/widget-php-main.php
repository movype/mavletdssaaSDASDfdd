$("#donate_pex_block").append('<input type="text" class="donate_fc text-center form-control form-control-alt checkoutinput" id="sum" name="sum" placeholder="Введите вашу сумму">');
$('#sum').hide();
$('select[name="good"]').change( function() {
if ($('select[name="good"]').val() == 'coins') {
$('#sum').show();
} else {
$('#sum').hide();
}
});
$("#good").html("<option value='coins'>Игровая валюта [1 РУБ = 1.0 coins]</option>");
if ($('select[name="good"]').val() == 'coins') {
$('#sum').show();
} else {
$('#sum').hide();
}