import TermTile from "./TermTile";

const Course = {
    // Course Data
    cid: '',
    preq: [],
    offr: 'FWSU',
    load: '1',
    // Table Data
    selected: false,
    // Planner Data
    preqsAdded: 0,
}

function encodeOfferingsAsNumbers(course) {
    const encodedOfferings = []
    if (course.offr.includes('F')) encodedOfferings.push(0)
    if (course.offr.includes('W')) encodedOfferings.push(1)
    if (course.offr.includes('S')) encodedOfferings.push(2)
    if (course.offr.includes('U')) encodedOfferings.push(3)

    return encodedOfferings
}

export function createCourseFromString(cid, preq='', offr='', load='') {
    let newCourse = Object.create(Course)
    newCourse.cid = cid
    newCourse.preq = (preq.length === 0) ? [] : preq.split(' ')
    newCourse.offr = (offr.length === 0) ? 'FWSU' : offr
    newCourse.load = (load.length === 0) ? '1' : load
    newCourse.selected = false
    newCourse.preqsAdded = 0

    return newCourse
}

export function createCourseFromRaw(cid, preq, offr, load) {
    let newCourse = Object.create(Course)
    newCourse.cid = cid
    newCourse.preq = preq
    newCourse.offr = offr
    newCourse.load = load
    newCourse.selected = false
    newCourse.preqsAdded = 0

    return newCourse
}

export function reformatPreqsForTable(preqAsList) {
    // let preqAsList = preqAsString.split(' ')
    return preqAsList.map(preq => {
        if (preq[0] === '*' && preq[1] !== '*') {
            return preq
        } else {
            return preq
        }
    }).join(' ')
}


// Fall Winter Spring Summer
// 0    1      2      3
// idx -> Quarter: idx (mod 4)
const Quarter = {
    courses: [],
    currentLoad: 4,

    addCourse: function(courseToAdd) {
        // check to see if space is available
        if (this.currentLoad - courseToAdd.load < 0) {
            // if space is not available return false
            // for the course did NOT fit in the quarter
            return false
        }

        // else, add the course to the courses list and
        // update the current load to account for the
        // new course.
        this.currentLoad = this.currentLoad - courseToAdd.load
        this.courses.push(courseToAdd.cid)
        // return true for the course DID fit in the quarter
        return true
    }
}

function createQuarter(maxLoad=4) {
    let newQuarter = Object.create(Quarter)
    newQuarter.courses = []
    newQuarter.currentLoad = maxLoad

    return newQuarter
}


const CoursePlanner = {
    quarters: [],
    sortedCourses: [],
    maxLoad: 4,
    useSummer: false,

    generateCoursePlan: function (courselist) {
        // copy and sort all courses
        this.sortCourses(courselist)
        // add all courses to the plan
        this.populateQuarters()
        // convert to a table format
        return this.convertToTable()
    },

    convertToTable: function() {

        if (this.quarters.length === 0) {
            return []
        }

        // const addYear = () => {
        //     setCoursePlan(coursePlan => [...coursePlan,
        //         <tr>
        //             <td>{coursePlan.length+1}</td>
        //             <TermTile content={[]}/>
        //             <TermTile content={[]}/>
        //             <TermTile content={[]}/>
        //             <TermTile content={[]}/>
        //         </tr>
        //     ])
        // }
        //
        // const removeYear = () => {
        //     setCoursePlan(coursePlan => {
        //         const coursePlanCopy = [...coursePlan]
        //         coursePlanCopy.pop()
        //         return coursePlanCopy
        //     })
        // }

        // split this.quarters into lists of 4 consecutive
        // quarters, or 'years'
        let years = [], i = 0, n = this.quarters.length;
        if (this.calcTotalUsableTerms() === 3) {
            while (i < n) {
                years.push(this.quarters.slice(i, i += 3))
                console.log(years)
            }
        } else {
            while (i < n) {
                years.push(this.quarters.slice(i, i += 4))
            }
        }
        // while (i < n) {
        //     if (this.calcTotalUsableTerms() === 3) {
        //         years.push(this.quarters.slice(i, i += 3))
        //     } else {
        //         years.push(this.quarters.slice(i, i += 4))
        //     }
        //     // years.push(this.quarters.slice(i, i += this.calcTotalUsableTerms()))
        //     // years.push(this.quarters.slice(i, i += 4))
        // }

        // map the list of quarters to a table format for Course Plan
        return years.map((year, index) => {
            return <tr><td>{index+1}</td>{year.map(qrt => <TermTile content={qrt.courses}/>)}</tr>
        })
    },

    sortByPreq: function (unsortedCourses) {
        // start at index 0
        let idx = 0
        let allPreqsAdded
        // for each course check if its preqs have been added to the sortedCourses
        while (unsortedCourses.length > 0) {
            // assume the preqs have already been added (in case a course has no preqs)
            allPreqsAdded = true
            // check if all preqs have been added to the sortedCourses array
            // if there are no preqs for the course, then it is a seed course
            for (const preq of unsortedCourses[idx].preq) {
                let sortedCoursesCids = this.sortedCourses.map((course) => {return course.cid})
                // if there exists a preq that hasnt been added update the
                // the status of allPreqsAdded and break from this loop
                if (!sortedCoursesCids.includes(preq)) {
                    allPreqsAdded = false
                    break
                }
            }
            // if all prerequisites for the course have been
            // added, push the course to the sorted course list
            // and delete it from the unsorted course list
            if (allPreqsAdded) {
                this.sortedCourses.push(unsortedCourses[idx])
                unsortedCourses.splice(idx, 1)
            }
            // increment the index
            idx = (idx + 1) % unsortedCourses.length

        }
    },

    sortCourses: function(courselist) {
        // copy the courseTable
        let unsortedCourses = [...courselist]
        // Sort Order : The more important a sort is, the further towards the end it's placed
        // [OPTIONAL SORT] sort courses by course load (High Load -> Low Load)
        // unsortedCourses = unsortedCourses.sort((a,b) => {return b.load - a.load}) // [REMOVED SORT] NOT NECESSARY
        // sort courses by frequency of Offers (Low Frequency -> High Frequency)
        unsortedCourses = unsortedCourses.sort((a,b) => {return a.preq.length - b.preq.length})
        // sort courses by prerequisite
        this.sortByPreq(unsortedCourses)

    },

    populateQuarters: function() {
        this.quarters.push(createQuarter(this.maxLoad))
        // for all courses add each course to the course plan
        for (const courseToAdd of this.sortedCourses) {
            // start at quarter 0
            let qtrIdx = 0
            let courseAddedToQuarter = false

            // iterate through each quarter until the course is sorted into one quarter
            do {
                // only once all preqs of the courseToAdd have been added, can the
                // courseToAdd be added
                let haveAllPreqsBeenAdded = (courseToAdd.preq.length === courseToAdd.preqsAdded)

                // only if the course is offered in the quarter can the course be added this quarter
                // check if the course is offered in the quarter
                let courseIsOfferedInQuarter = encodeOfferingsAsNumbers(courseToAdd).includes(qtrIdx % this.calcTotalUsableTerms())
                // let courseIsOfferedInQuarter = encodeOfferingsAsNumbers(courseToAdd).includes(qtrIdx % 4)

                if (!haveAllPreqsBeenAdded) {
                    // check to see if any preqs are offered in the quarter
                    // and eliminate them so as to mark the preqs as added
                    for (let addedCourse of this.quarters[qtrIdx].courses) {
                        if (courseToAdd.preq.includes(addedCourse)) {
                            courseToAdd.preqsAdded++
                        }
                    }
                }
                // if the course is both offered this quarter and all its preqs have been sorted will
                // should the course attempt to be added to the quarter
                else if (courseIsOfferedInQuarter) {
                    // If the course is offered in the quarter, try to add it to the quarter
                    // and save the status
                    courseAddedToQuarter = this.quarters[qtrIdx].addCourse(courseToAdd)
                }

                // If the course is not offered in the quarter or all preqs have not yet been added
                if (!courseAddedToQuarter) {
                    // Increment the qtrIdx to move onto the following quarter
                    // If the qtrIndex is gteq the total number of quarters, add a new quarter
                    // to the quarters array
                    if (++qtrIdx >= this.quarters.length) {
                        this.quarters.push(createQuarter(this.maxLoad))
                    }
                }
            } while(!courseAddedToQuarter)
        }

        return this.quarters
    },

    calcTotalUsableTerms: function() {
        // NOTE: This can be expanded to utilize semester/quarter systems
        if (this.useSummer) {
            return 4
        } else {
            return 3
        }
    }
}

export function createCoursePlanner(maxLoad=4, useSummer=false) {
    let newCoursePlan = Object.create(CoursePlanner)
    newCoursePlan.quarters = []
    newCoursePlan.sortedCourses = []
    newCoursePlan.maxLoad = maxLoad
    newCoursePlan.useSummer = useSummer

    return newCoursePlan
}
