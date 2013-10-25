google.load("visualization", "1", {packages:["corechart"]});

var Manager;
(function ($) {
    $(function () {
	Manager = new AjaxSolr.Manager({
	    solrUrl: 'http://localhost:8983/solr/viviendas/'
	});
	Manager.addWidget(new AjaxSolr.ResultWidget({
	    id: 'result',
		docsHeader: '#docsHeader',	    
	    docsBody: '#docsBody'
	}));

	var fields = [ 
		'DPTO', 'DPTOLOC', 'CCZ', 'SP_2010', 'TIPO_VIVIE', 'VIVVO01', 
		'VIVVO03', 'VIVVO04', 'VIVDV01', 'VIVDV02', 'VIVDV03',  
		'VIVDV05' , 'VIVDV06', 'VIVDV07', 'VIVHV01', 'CATEVIV'
	];
	for (var i = 0, l = fields.length; i < l; i++) {
	  Manager.addWidget(new AjaxSolr.FacetWidget({
	    id: fields[i],
	    target: '#' + fields[i],
	    field: fields[i]
	  }));
	}
	Manager.addWidget(new AjaxSolr.CurrentSearchWidget({
	  id: 'currentsearch',
	  target: '#selection',
	}));
	Manager.addWidget(new AjaxSolr.PagerWidget({
	    id: 'pager',
	    target: '#pager',
	    prevLabel: '&lt;',
	    nextLabel: '&gt;',
	    innerWindow: 1,
	    renderHeader: function (perPage, offset, total) {
			$('#pager-header').html($('<span></span>').text('displaying ' + Math.min(total, offset + 1) + ' to ' + Math.min(total, offset + perPage) + ' of ' + total));
	    }
	}));
	Manager.addWidget(new AjaxSolr.ChartWidget({
	    id: 'field',
	    target: '#field',
	    targetChart: '#chartType',
	    chart: new google.visualization.PieChart(document.getElementById('piechart'))
	}));
	Manager.init();
	Manager.store.addByValue('q', '*:*');

	var query = '';
	if (window.location.search.substring(1)) {
	    query = window.location.search.substring(1);
	}
	query = query.split('|')[0];
	if (query) {
	    var qfields = query.split('_');
	    for (var i = 0; i < qfields.length; i++) {
		Manager.store.addByValue('fq', qfields[i].split('-')[0] + ':' + qfields[i].split('-')[1]);
	    }
	}	
	google.load("visualization", "1", {packages:["corechart"]});

	var params = {
	    facet: true,
	    'facet.field': fields,
	    'facet.limit': 20,
	    'facet.mincount': 1,
	    'f.topics.facet.limit': 50,
	    'json.nl': 'map'
	};
	
	for (var name in params) {
	    Manager.store.addByValue(name, params[name]);
	};
	
	Manager.doRequest();
    });
})(jQuery);