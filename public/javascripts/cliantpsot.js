'use strict';
$(() => {
  $('#file').change(() => {

    const file = $('#file').prop('files')[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    if (file.type.match('image.*')) {  
      reader.addEventListener('load', () => {
        $('#button').on('click', () => {

          const x = $('#xScale').val();
          const y = $('#yScale').val();
          let con
          $('input[name=lang]:checked').val() === 'png' ? con = 'png' : con = 'jpg';
          if (x == '' || y == '') {

            alert('数値の入力してください');

          } else if (5000 > x > 0 || 5000 > y > 0) {
            $('#button').prop('disabled', true);
              const postdata = encodeURIComponent(reader.result);
              
              $.ajax({
                type:'POST',
                url :'/post',
                ansync: false,
                dataType:'text',
                cache: false,
                processData: false,
                data:`postImage=${postdata}&x=${x}&y=${y}&type=${con}`
              }).done(() => {
                $.redirect('/post');
                $('#file').attr('value', '');
            });
            window.location.href = '/post'
          } else {

            alert('数値は0以上5000以下を入力してください');
            $('#xScale').attr('value', '');
            $('#yScale').attr('value', '');
          }
        });

      });

    } else {

      $('#file').attr('value', '');
      alert('画像を選択してください')
    }


  });
});
