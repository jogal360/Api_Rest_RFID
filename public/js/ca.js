	$(document).ready(function() {
		$('#calendar').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,basicWeek,basicDay'
			},
			defaultDate: '2016-07-12',
			editable: true,
			eventLimit: true, // allow "more" link when too many events
			events: [
			{
				title: 'Revision de proyecto',
				start: '2016-07-25'
			}
			]
		});

		});
