<template>
  <div class="map">
    <div :id="mapContainerId" :class="mapContainerClass"/>
    <Tooltip :id="mapTooltipId"/>
  </div>
</template>

<script>
import * as d3 from 'd3'
import * as topojson from 'topojson'
import Tooltip from './tooltip'
import map from '~/assets/json/carto.json'

export default {
  components: {
    Tooltip
  },
  props: {
    members: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data () {
    return {
      mapContainerId: 'map-container',
      mapContainerClass: 'map-container',
      mapTooltipId: 'map-tooltip',
      districtHighlightClass: 'district-highlight',
      stateHighlightClass: 'state-highlight',
      usmaphex: map,
      defaultWidth: 1000,
      defaultHeight: 800,
      tooltipWidth: 200,
      tooltipHeight: 100,
      stateRect: {}
    }
  },
  computed: {
    geojson () {
      return topojson.feature(this.usmaphex, this.usmaphex.objects.hex)
    },
    projection () {
      return d3
        .geoIdentity()
        .reflectY(true)
        .fitSize([this.defaultWidth * 0.9, this.defaultHeight * 0.9], this.geojson)
    },
    geoPath () {
      return d3.geoPath().projection(this.projection)
    },
    svg () {
      return d3
        .select(`#${this.mapContainerId}`)
        .append('svg')
        .attr('width', this.defaultWidth)
        .attr('height', this.defaultHeight)
    }
  },
  mounted () {
    this.drawMap()
  },
  methods: {
    drawMap () {
      const self = this
      const tooltip = d3.select(`#${self.mapTooltipId}`)
      const svgRect = self.svg.node().getBoundingClientRect()

      // map
      self.svg
        .selectAll('path')
        .data(self.geojson.features)
        .enter()
        .append('path')
        .attr('d', feature => {
          return self.geoPath(feature)
        })
        .attr('class', function (feature) {
          const state = feature.properties.state
          const rect = this.getBoundingClientRect()

          if (self.stateRect[state]) {
            self.stateRect[state].top = rect.top < self.stateRect[state].top ? rect.top : self.stateRect[state].top
            self.stateRect[state].bottom =
              rect.bottom > self.stateRect[state].bottom ? rect.bottom : self.stateRect[state].bottom
            self.stateRect[state].right =
              rect.right > self.stateRect[state].right ? rect.right : self.stateRect[state].right
            self.stateRect[state].left = rect.left < self.stateRect[state].left ? rect.left : self.stateRect[state].left
          } else {
            self.stateRect[state] = {
              top: rect.top,
              bottom: rect.bottom,
              right: rect.right,
              left: rect.left
            }
          }

          return `district state-${state}`
        })

      // borders
      self.svg
        .append('path')
        .attr('class', 'district-borders')
        .attr(
          'd',
          self.geoPath(
            topojson.mesh(self.usmaphex, self.usmaphex.objects.hex, function (a, b) {
              return a !== b
            })
          )
        )

      // outline
      self.svg
        .append('path')
        .attr('class', 'map-outline')
        .attr(
          'd',
          self.geoPath(
            topojson.mesh(
              self.usmaphex,
              self.usmaphex.objects.hex,
              (a, b) => a.properties.district === b.properties.district && a.properties.state === b.properties.state
            )
          )
        )

      // handle map on hover
      self.svg
        .selectAll('.district')
        .on('mouseover', function (feature) {
          this.classList.add('hovered')
          d3.select(`#${self.mapContainerId}`).classed('hovered', true)
          self.addDistrictHighlight(feature.properties.state, feature.properties.district)
          self.addStateHighlight(feature.properties.state)
          tooltip.style('visibility', 'visible')
        })
        .on('mouseout', function (feature) {
          this.classList.remove('hovered')
          self.removeDistrictHighlight()
          self.removeStateHighlight(feature.properties.state)
          d3.select(`#${self.mapContainerId}`).classed('hovered', false)
          tooltip.style('visibility', 'hidden')
        })
        .on('mousemove', function (feature) {
          const state = feature.properties.state
          const top = (self.stateRect[state].top + self.stateRect[state].bottom) / 2 - self.tooltipHeight / 2
          const left = self.stateRect[state].right + 10
          tooltip.style('top', top + 'px').style('left', left + 'px')
        })
    },
    addDistrictHighlight (state, district) {
      this.svg
        .append('path')
        .attr('class', this.districtHighlightClass)
        .attr(
          'd',
          this.geoPath(
            topojson.mesh(this.usmaphex, this.usmaphex.objects.hex, function (a, b) {
              return (
                (a.properties.state === state && a.properties.district === district) ||
                (b.properties.state === state && b.properties.district === district)
              )
            })
          )
        )
    },
    addStateHighlight (state) {
      this.svg
        .append('path')
        .attr('class', this.stateHighlightClass)
        .attr(
          'd',
          this.geoPath(
            topojson.mesh(this.usmaphex, this.usmaphex.objects.hex, function (a, b) {
              return (
                (a.properties.state === state && b.properties.state !== state) ||
                (b.properties.state === state && a.properties.state !== state)
              )
            })
          )
        )
      d3.selectAll(`.state-${state}`).classed('highlighted', true)
    },
    removeDistrictHighlight () {
      d3.select(`.${this.districtHighlightClass}`).remove()
    },
    removeStateHighlight (state) {
      d3.select(`.${this.stateHighlightClass}`).remove()
      d3.selectAll(`.state-${state}`).classed('highlighted', false)
    }
  }
}
</script>


<style lang="scss">
@import 'assets/css/app';
@import 'assets/css/colors';
@import 'assets/css/typography';

.map-container {
  .district {
    fill: $twIronLighter;
  }

  .district-borders {
    fill: none;
    stroke: #fff;
    stroke-width: 0.5px;
    stroke-linejoin: round;
    stroke-linecap: round;
    pointer-events: none;
  }
}

.map-container.hovered {
  .district {
    fill: lighten($twIronLighter, 5%);

    &.highlighted.hovered {
      fill: salmon;
    }

    &.highlighted {
      fill: darken($twIronLighter, 5%);
    }
  }
}

.district-highlight {
  fill: none;
  stroke: #000;
  stroke-width: 3px;
  stroke-linejoin: round;
  stroke-linecap: round;
  pointer-events: none;
}

.state-highlight {
  fill: none;
  stroke: #000;
  stroke-width: 1px;
  stroke-linejoin: round;
  stroke-linecap: round;
  pointer-events: none;
}

.map-outline {
  fill: none;
  stroke: #000;
  stroke-width: 1px;
}
</style>



