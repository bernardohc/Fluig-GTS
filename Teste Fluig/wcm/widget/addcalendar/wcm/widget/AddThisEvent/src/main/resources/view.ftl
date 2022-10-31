<#assign params = '{instanceId: ${instanceId?c}, title: "${title!""}",place: "${place!""}", startDate: ${startDate!0}, endDate: ${endDate!0},timezone: "${timezone!""}", organizer: "${organizer!""}",organizerEmail: "${organizerEmail!""}", eventDescription:"${eventDescription!""}"}'?html/>
<div id="AddThisEventView_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide"
	data-params="AddThisEventView.instance(${params})">
	<div class="panel panel-default">
		<div class="panel-body">
			<div>
				<div >
					<div class="media" id="event_${instanceId}">
					</div>
				</div>
			</div>
			<div class="form-group" id="targetcalendar_${instanceId}"></div>
		</div>
	</div>
	
	<script type="text/template" class="event-period">
		<legend>
			<span class="fluigicon fluigicon-calendar fluigicon-md"></span>
			<span >{{eventTitle}}</span>
		</legend>
		<p class="pull-left" href="/portal/p/fluigci/social/admin.fluig">
			<span class="fluigicon fluigicon-time"></span>
		</p>
		<div class="media-body">
			<span>{{eventPeriodText}}</span>
			<p class="text-muted">
				<small>{{eventPeriodFullText}}</small>
			</p>
		</div>
  	    {{#location}}
			<p class="pull-left" href="/portal/p/fluigci/social/admin.fluig">
				<span class="fluigicon fluigicon-map-marker"></span>
			</p>
			<div class="media-body">
				<span>{{location}}</span>
			</div>
		 {{/location}}
	</script>
</div>

