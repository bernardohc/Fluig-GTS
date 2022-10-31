<#assign params = '{instanceId: ${instanceId?c}, title: "${title!""}", place: "${place!""}", startDate: ${startDate!0}, endDate: ${endDate!0}, timezone: "${timezone!""}", organizer: "${organizer!""}", organizerEmail: "${organizerEmail!""}", eventDescription: "${eventDescription!""}"}'?html/>

<div id="AddThisEvent_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide"
	data-params="AddThisEvent.instance(${params})" >
	<div class="panel panel-default">
		<div class="panel-body">
			<form role="form" data-form-edit>
					<div class="form-group">
						<label>
							${i18n.getTranslation('title')}
							<em class="form-req">*</em>	<small></small>
						</label>
						<input type="text" class="form-control" id="title_${instanceId}"
							placeholder="${i18n.getTranslation('enter.title')}" required="true">
					</div>
					<div class="form-group">
						<label>
							${i18n.getTranslation('place')}
						</label>
						<input type="text" class="form-control" id="place_${instanceId}"
							placeholder="${i18n.getTranslation('enter.place')}">
					</div>
					<div class="form-group">
						<label>
							${i18n.getTranslation('startdate')}
							<em class="form-req">*</em><small></small>
						</label>
						<input type="text" class="form-control" name="startdate"
							id="startdate_${instanceId}" data-date-format="DD/MM/YYYY hh:mm A" value=""
							placeholder="${i18n.getTranslation('enter.startdate')}" required="true">
					</div>
					<div class="form-group">
						<label>
							${i18n.getTranslation('enddate')}
							<em class="form-req">*</em><small></small>
						</label>
						<input type="text" class="form-control" name="enddate" id="enddate_${instanceId}"
							value="" data-date-format="DD/MM/YYYY hh:mm A" 
							placeholder="${i18n.getTranslation('enter.enddate')}"	required="true">
					</div>
					<div class="form-group">
						<label>
							${i18n.getTranslation('timezone')}
						</label>
						<select name="timezone" id="timezone_${instanceId}" required="true"
							class="form-control"></select>
					</div>
					<div class="form-group">
						<label>
							${i18n.getTranslation('organizer')}
						</label>
						<input type="text" class="form-control" id="organizer_${instanceId}"
							placeholder="${i18n.getTranslation('enter.organizer')}">
					</div>
					<div class="form-group">
						<label>
							${i18n.getTranslation('organizeremail')}
						</label>
						<input type="text" class="form-control" id="organizeremail_${instanceId}"
							placeholder="${i18n.getTranslation('enter.organizeremail')}">
					</div>
					<div class="form-group fs-overflow-hidden">
						<label>
							${i18n.getTranslation('description')}
						</label>
						<div class="alert alert-warning" role="alert">
							<strong>${i18n.getTranslation("alert.atention")}: </strong>
									${i18n.getTranslation("alert.outlook")}
							<p>${i18n.getTranslation("alert.description.max.length")}</p>
						</div>
						<div>
							<textarea name="event-description" id="event-description_${instanceId}"></textarea>
						</div>
					</div>
					<div class="pull-right">
						<button type="button" class="btn btn-primary"
							data-loading-text="Loading..." data-save-event-context>${i18n.getTranslation('btn.save')}
						</button>
					</div>
			</form>
		</div>
	</div>
</div>

