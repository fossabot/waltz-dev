/*
 * Waltz - Enterprise Architecture
 * Copyright (C) 2016, 2017 Waltz open source project
 * See README.md for more information
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */


import _ from "lodash";
import template from "./playpen1.html";
import {CORE_API} from "../../common/services/core-api-utils";
import {initialiseData} from "../../common";
import {
    mkRandomMeasurable,
    mkRandomRowData,
    prepareData
} from "../../scenario/components/scenario-diagram/scenario-diagram-data-utils";

const initData = {


};

function mkDemoData(colCount, rowCount) {
    return {
        rowData: _.times(rowCount, () => mkRandomRowData(colCount)),
        columnHeadings: _.times(colCount, i => mkRandomMeasurable(i, "col")),
        rowHeadings: _.times(rowCount, i => mkRandomMeasurable(i, "row"))
    }
}


function controller($element, $q, serviceBroker) {

    const vm = initialiseData(this, initData);


    vm.$onInit = () => {
        const cmd = {
            "changeType": "UPDATE_CONCRETENESS",
            "changeDomain": {
                "kind": "MEASURABLE_CATEGORY",
                "id": 4,
            },
            "a": {
                "kind": "MEASURABLE",
                "id": 587,
            },
            "newValue": "false",
            "createdBy": "admin"
        };
        serviceBroker
            .execute(
                CORE_API.TaxonomyManagementStore.preview,
                [ cmd ])
            .then(r => vm.preview = r.data);
    };
}

controller.$inject = ["$element", "$q", "ServiceBroker"];

const view = {
    template,
    controller,
    controllerAs: "$ctrl",
    bindToController: true,
    scope: {}
};

export default view;