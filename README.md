# OSCP: Open Source Course Planner

## Introduction
Writing a course plan can be a tedious process. Balancing just two factors (like prerequisites and course offerings) for a few courses can be a headache. And some of us like to consider the difficulty of each course to make sure we’re not overwhelmed for a one-off term. What’s worse is when a painstakingly developed course plan fails to hold (due to limited seat availability/the school changing when a course is offered/or even a small error while drafting your plan) which means pouring more of your time into course planning. Open Source Course Planner, or OSCP, is a universal course planing utility for us, college students, to help reduce the amount of time we spend creating course plans. By universal, we mean this course planner should (theoretically) work for any university system. We make this claim by observing most colleges use the following two metrics for determining how courses progress: prerequisites and course offerings. Some universities use additional metrics like corequisites or consecutive courses, etc. OSCP provides tools that account for each of these metrics and more.

> OSCP is not a course planner in the one-term sense, i.e. it does not check for time conflicts, seat availability, primary instructors, etc. Many universities already offer their own course planning utility for such purposes. OSCP is a course planner which, given a list of courses, their prerequisites, when they're offered, difficulty, etc. can generate a course plan while trying to minimize the number of years to complete those courses.

### [Launch OSCP](https://quartershotofespresso.github.io/CoursePlanner/)
> OSCP is being developed in Chrome. Better support/UI for other browsers is planned upon completion of the tool...

## Recent Updates...
- Implement add/remove functionality for Year +/- buttons.
- Course counter next to Course List caption.
- TermTiles (Course Plan is now editable).

## Upcoming Bug Fixes...
- Last generated year in course plan has an un-editable TermTile.
- Drifting out of Course List boundary while highlighting doesn't stop highlighting.

## Upcoming Features/Under development...
- Add Course List searchability to Course Entry forms.
- Change `Scramble Course List` icon to something more indicative of scrambling.
- Add functionality to toggle quarter availability/gray-ing out quarters.
- Add `Shift-Enter` key pattern to exit edit-mode of TermTile.

## Planned Features...
- Light Reference Document
- Disable-able Courses in Course List (won't be considered in Course Plan).
- Consecutive Course Entry

## Features under Contemplation...
- Shareable Links (eliminates the need to download/upload content).
- `Hide/Minimize` Course List button (to the left of the Course List caption).
  - Or a scrollable window pane of fixed size.
- Interactive Tutorial.
- Tweaking load of specific quarters.