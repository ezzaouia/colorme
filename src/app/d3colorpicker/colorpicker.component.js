import { module } from 'angular';
import * as d3 from 'd3';
import * as _ from 'lodash';

import template from './colorpicker.component.html';
import './colorpicker.component.scss';

export class D3ColorPicker {

    constructor() {
        this.squareWidth = 30;
        this.squareHPad = 1;
        this.squareVPad = 1;
        this.squareHeight = 30;
        this.currentHoveredColorH = 40;
        this.currentHoveredTxtLabelH = 20;
        this.margin = { top: 10, left: 10, right: 10, bottom: 10 };
        this.colorLevels = 10;
        this.colors = [
            {
                min: '#EF5350',
                max: '#B71C1C'
            },
            {
                min: '#EC407A',
                max: '#880E4F'
            },
            {
                min: '#AB47BC',
                max: '#4A148C'
            },
            {
                min: '#7E57C2',
                max: '#311B92'
            },
            {
                min: '#5C6BC0',
                max: '#1A237E'
            },
            {
                min: '#42A5F5',
                max: '#0D47A1'
            },
            {
                min: '#29B6F6',
                max: '#01579B'
            },
            {
                min: '#26C6DA',
                max: '#006064'
            },
            {
                min: '#26A69A',
                max: '#004D40'
            },
            {
                min: '#66BB6A',
                max: '#1B5E20'
            },
            {
                min: '#9CCC65',
                max: '#33691E'
            },
            {
                min: '#D4E157',
                max: '#827717'
            },


            {
                min: '#FFEE58',
                max: '#F57F17'
            },
            {
                min: '#FFCA28',
                max: '#FF6F00'
            },
            {
                min: '#FFA726',
                max: '#E65100'
            },
            {
                min: '#FF7043',
                max: '#BF360C'
            },

            {
                min: '#8D6E63',
                max: '#3E2723'
            },
            {
                min: '#BDBDBD',
                max: '#212121'
            }
        ];

        this.svgWidth = _.size(this.colors) * (this.squareWidth + this.squareHPad) + this.margin.left + this.margin.right;
        this.svgHeight = this.colorLevels * (this.squareHeight + this.squareVPad) + this.margin.top + this.margin.bottom + this.squareVPad + this.currentHoveredColorH + this.currentHoveredColorH;
        this.currentSelectedColor;
        
    }

    draw(domElement) {
        let squareWidth = this.squareWidth;
        let squareVPad = this.squareVPad;
        let squareHPad = this.squareHPad;
        let currentHoveredColorH = this.currentHoveredColorH;
        let currentSelectedColor  = {selectedColor: '', colorLevelIndex: -1, colorIndex:  -1};
        this.currentSelectedColor = currentSelectedColor;

        // init
        this.svg = d3.select(domElement)
            .select('#d3colorpicker')
            .select('svg')
            .remove();

        this.svg = d3.select(domElement)
            .select('#d3colorpicker')
            .append('svg')
            .attr('width', this.svgWidth)
            .attr('height', this.svgHeight)
            .append('g')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)

        this.svg.selectAll('g')
            .data(this.dataGenerator(this.colors, this.colorLevels))
            .enter()
            .append('g')
            .attr('transform', (d, i) => { return `translate(${i * (this.squareWidth + this.squareHPad)}, ${0})` })

        this.svg.selectAll('g')
            .attr('d', function (d, i) {
                let self = this;
                _.each(d, (color, index) => {
                    d3.select(self).append('rect')
                        .attr('fill', color)
                        .attr('width', squareWidth)
                        .attr('height', squareWidth)
                        .attr('y', index * (squareWidth + squareVPad))
                        .classed('rect-color', true)
                        .on('mouseover', function () {
                            d3.selectAll('.rect-color').attr('stroke', 'none')
                            d3.select(this).attr('stroke', '#eee')
                            d3.select(this).attr('stroke-width', 2)
                            let curretColor = d3.select(this).attr('fill');
                            d3.selectAll('.current-color').attr('fill', curretColor);
                        })
                        .on('click', function () {
                            d3.selectAll('.selected-color').attr('stroke', 'none')
                            d3.select(this).attr('stroke', '#555')
                            d3.select(this).attr('stroke-width', 2)
                            let curretColor = d3.select(this).attr('fill');
                            d3.select('.selected-color').attr('fill', curretColor);
                            currentSelectedColor['selectedColor'] = curretColor;
                            currentSelectedColor['colorLevelIndex'] = index;
                            currentSelectedColor['colorIndex'] = i;
                        })

                }); // end each
            }); // attr d

        // adding text labels
        this.svg.select('g')
            .append('text')
            .text('Current Color')
            .attr('y', this.colorLevels * (squareWidth + squareHPad) + 3 + this.currentHoveredTxtLabelH / 2)
            .classed('current-color-label', true)

        this.svg.select('g')
            .append('text')
            .text('Selected Color')
            .attr('y', this.colorLevels * (squareWidth + squareHPad) + 3 + this.currentHoveredTxtLabelH / 2)
            .attr('x', _.size(this.colors) * (squareWidth + squareVPad) / 2 + 5)
            .classed('current-color-label', true)

        this.svg.select('g')
            .append('rect')
            .attr('width', _.size(this.colors) * (squareWidth + squareVPad) / 2 - 5)
            .attr('height', currentHoveredColorH)
            .attr('fill', '#fff')
            .attr('y', this.colorLevels * (squareWidth + squareHPad) + this.currentHoveredTxtLabelH)
            .classed('current-color', true)

        this.svg.select('g')
            .append('line')
            .attr('x1', _.size(this.colors) * (squareWidth + squareVPad) / 2)
            .attr('x2', _.size(this.colors) * (squareWidth + squareVPad) / 2)
            .attr('y1', this.colorLevels * (squareWidth + squareHPad) + squareHPad)
            .attr('y2', this.colorLevels * (squareWidth + squareHPad) + currentHoveredColorH + squareHPad + this.currentHoveredTxtLabelH)
            .attr('stroke-dasharray', 2, 2)
            .style('stroke', '#808285')

        this.svg.select('g')
            .append('rect')
            .attr('width', _.size(this.colors) * (squareWidth + squareVPad) / 2 - 5)
            .attr('height', currentHoveredColorH)
            .attr('fill', '#fff')
            .attr('y', this.colorLevels * (squareWidth + squareHPad) + this.currentHoveredTxtLabelH)
            .attr('x', _.size(this.colors) * (squareWidth + squareVPad) / 2 + 5)
            .classed('selected-color', true)


    }

    dataGenerator(colors, colorLevels) {
        let data = [];
        let scale = d3.scaleLinear().domain([0, colorLevels])

        _.each(colors, (color) => {
            scale.range([color.min, color.max]);
            data.push(
                _.map(Array(colorLevels), (item, index) => {
                    return scale(index);
                }) // end map
            ); // end push
        }); // end times

        return data;
    }

}

class D3ColorPickerController extends D3ColorPicker {

    constructor($log, $rootScope, $http, $element) {
        'ngInject'
        super();
        this.$log = $log.getInstance(D3ColorPickerController.name);
        this.$http = $http;
        this.$element = $element;
    }

    log(...msg) {
        this.$log.debug(...msg);
    }

    $onInit() {
        super.draw(this.$element[0]);
    }

}

const D3ColorPickerComponent = {
    template,
    restricted: 'E',
    controllerAs: 'vm',
    controller: D3ColorPickerController,
};

export default module('app.d3colorpicker', [])
    .component('d3colorpicker', D3ColorPickerComponent);