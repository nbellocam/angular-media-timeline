/**
@toc

@param {Object} scope (attrs that must be defined on the scope (i.e. in the controller) - they can't just be defined in the partial html). REMEMBER: use snake-case when setting these on the partial!
TODO

@param {Object} attrs REMEMBER: use snake-case when setting these on the partial! i.e. my-attr='1' NOT myAttr='1'
TODO

@dependencies
TODO

@usage
partial / html:
TODO

controller / js:
TODO

//end: usage
*/

'use strict';

angular.module('animates.angular-timeline', [])
	.directive('animatesTimelinepoint', function () {
		return {
			restrict: 'E',
			template:	"",
			scope: {
				point: '=',
			},
			link:
			{
				pre : function ($scope, element, attrs) {
							element.css({
								left: $scope.point.tick + 'px'
							});

							element.addClass('timeline-point');

							console.log('animatesTimelinepoint');
						},
				post : function () {}
			} 
		};
	})
	.directive('animatesTimelineevent', function () {
		return {
			restrict: 'E',
			template:	"",
			scope: {
				evt: '=',
			},
			link: function ($scope, element, attrs) {
				var evt = $scope.evt;
				element.css({
					left: evt.start + 'px',
					width: evt.duration + 'px',
				});

				element.addClass('timeline-event');
				element.addClass(evt.class);
			}
		};
	})
	.directive('animatesTimeline', function () {
		return {
			restrict: 'E',
			template:	"<div class='timeline-content'>" +
									"<animates-timelinepoint ng-repeat='point in data.points' point='point'> </animates-timelinePoint>" +
									"<animates-timelineevent ng-repeat='event in data.events' evt='event'> </animates-timelineevent>" +
								"</div>",
			scope: {
				data: '=',
			},
			link: function ($scope, element, attrs) {
				if ($scope.data.points) {
					element.addClass('points');
				}
				
				if ($scope.data.events) {
					element.addClass('events');
				}
			}
		};
	})
	.directive('animatesTimelines', function ($timeout) {
		return {
			restrict: 'E',
			template: "<input type='number' ng-change='tickchange();' ng-model='tick'></input>" +
						"<span>{{tick}}</span>" +
						"<div class='timelines-group' >" +
							"<div class='timelinesHeaders'>" +
								"<div ng-repeat='timeline in data' class='timeline-part timeline-header' id='{{timeline.guid}}' rel='{{timeline.guid}}'>" +
									"<span class='timeline-header-track'>{{timeline.name}}</span>" +
								"</div>" +
							"</div>" +
							"<div class='timelinesContainer'>" +
								"<div ng-repeat='timeline in data' class='timeline-part timeline' id='{{timeline.guid}}'>" +
									"<div class='elementLinesContainer' rel='{{timeline.guid}}'>" +
										"<animates-timeline ng-repeat='line in timeline.lines' data='line'>" +
									"</div>" +
								"</div>" +
							"</div>" +
						"</div>",
			scope: {
				data: '=',
				tick: '=',
				tickchange: "&"
			},
			link : function (scope, element, attrs, ctrl) {
					$timeout(function () {
						angular.forEach(element[0].querySelectorAll('.elementLinesContainer'), function(timeline){
							var id = angular.element(timeline).attr('rel'),
								height = angular.element(timeline)[0].offsetHeight;

							element[0].querySelector('.timeline-header[rel="' + id + '"]').style.height = height + 'px';
						});
					});
				}
		};
	});
