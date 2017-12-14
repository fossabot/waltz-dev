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

package com.khartec.waltz.jobs;

import com.khartec.waltz.data.person.PersonDao;
import com.khartec.waltz.service.DIConfiguration;
import org.jooq.DSLContext;
import org.jooq.impl.DSL;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import static com.khartec.waltz.schema.tables.Person.PERSON;
import static com.khartec.waltz.schema.tables.PersonHierarchy.PERSON_HIERARCHY;

/**
 * Created by dwatkins on 17/09/2016.
 */
public class PersonHarness {

    public static void main(String[] args) {
        AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext(DIConfiguration.class);

        DSLContext dsl = ctx.getBean(DSLContext.class);

        PersonDao personDao = ctx.getBean(PersonDao.class);

        int c = dsl.fetchCount(PERSON, PERSON.MANAGER_EMPLOYEE_ID.eq("").or(PERSON.MANAGER_EMPLOYEE_ID.isNull()));

        int c2 = dsl.fetchCount(DSL.selectDistinct(PERSON_HIERARCHY.MANAGER_ID).from(PERSON_HIERARCHY).where(PERSON_HIERARCHY.LEVEL.eq(1)));
        System.out.println(c);
        System.out.println(c2);



    }
}
