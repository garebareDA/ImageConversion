'use strict';

$(() => {
  $('#file').change(() => {

    let file = $('#file').prop('files')[0];
    let reader = new FileReader();

    if (file.type.match('image.*')) {
      reader.readAsDataURL(file);

      reader.addEventListener('load', () => {
        $('#button').on('click', () => {

          let x = $('#xScale').val();
          let y = $('#yScale').val();
          let con
          $('input[name=lang]:checked').val() === 'png' ? con = 'png' : con = 'jpg';
          const postdata = encodeURIComponent(reader.result);
          console.log(x);
          console.log(y);



          if (x == '' || y == '') {

            alert('数値の入力してください');

          } else if (5000 > x > 0 || 5000 > y > 0) {

            $.post('/post', 'postImage=' + postdata + '&x=' + x + '&y=' + y + '&type=' + con).done(() => {
              $.get('/post', (data) => {
                console.log(data);
                $('#post').attr('src', `${data}`);
              });
            });

          } else {
            alert('数値は0以上5000以下を入力してください');
            $('#xScale').attr('value', '');
            $('#yScale').attr('value', '');
          }
        });

      }, false);

    } else {

      $('#file').attr('value', '');
      alert('画像を選択してください')
    }


  });
});
