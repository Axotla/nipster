$(function() {
    var $table = $('table').dataTable({
        sAjaxSource: 'packages.json',
        aaSorting: [
            [5, 'desc']
        ],
        aoColumnDefs: [{
            sType: 'html',
            aTargets: [0]
        }],
        aoColumns: [
        null, null, null, null, null, null, null, null,
        {
            bVisible: false
        }],
        bLengthChange: false,
        sPaginationType: 'full_numbers',
        iDisplayLength: 21,
        bProcessing: true,
        bAutoWidth: false,
        bDeferRender: true,
        fnRowCallback: function(tr, data, i) {
            var $gh = $('td:first', tr);
            if ($gh.children().size() === 0) {
                var name = $gh.text().split(' ');
                var url = name[0];
                name = name[1];
                var $gha = $('<a>').attr('href', 'https://github.com/' + url).text(name);
                $gh.text('').append($gha);
            }

            var $npm = $('td:last', tr);
            if ($npm.html().length > 0) return;
            var name = $('td:first', tr).text();
            $npm.html('<a class="npm" href="http://npmjs.org/package/' + name + '">△</a>');
        }
    }).fnSetFilteringDelay(200);

    var $input = $(':input[type=text]').focus();

    $input.keyup(function(e) {
        if (e.keyCode === 27) {
            $table.fnFilter('');
            $input.val('');
            $input.click();
        }
        if (window.location.hash.length > 1) {
            window.History.replaceState({}, '', '#' + $input.val());
        }
        window.location.hash = $input.val();
    });

    var hash = window.location.hash.slice(1);
    if (hash.length > 0) {
        hash = decodeURIComponent(hash);
        $input.val(hash);
        $table.fnFilter($input.val());
    } else {
        $input.val('');
        $table.fnFilter('');
    }
});
