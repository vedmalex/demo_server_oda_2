import gql from 'graphql-tag';

export default async function ensureSubjectCourse({ args, context, create }) {
  // find
  let filter;
  let fArgs;
  let variables;
  if (args.id) {
    fArgs = '$id: ID';
    filter = 'id: $id';
    variables = {
      id: args.id,
    };
  }
  let subjectCourse;
  if (filter) {
    subjectCourse = await context
      .userGQL({
        query: gql`query findSubjectCourse(${fArgs}){
            subjectCourse(${filter}){
              id
            }
          }
          `,
        variables,
      })
      .then(r => r.data && r.data.subjectCourse);
  }

  if (!subjectCourse) {
    if (create) {
      subjectCourse = await context
        .userGQL({
          query: gql`
            mutation createSubjectCourse(
              $subjectCourse: createSubjectCourseInput!
            ) {
              createSubjectCourse(input: $subjectCourse) {
                subjectCourse {
                  node {
                    id
                  }
                }
              }
            }
          `,
          variables: {
            subjectCourse: {
              description: args.description,
              subject: args.subject,
              course: args.course,
              subjectLink: args.subjectLink,
              courseLink: args.courseLink,
              hours: args.hours,
              level: args.level,
              id: args.id,
            },
          },
        })
        .then(
          r =>
            r.data &&
            r.data.createSubjectCourse &&
            r.data.createSubjectCourse.subjectCourse &&
            r.data.createSubjectCourse.subjectCourse.node,
        );
    }
  } else {
    // update
    subjectCourse = await context
      .userGQL({
        query: gql`
          mutation updateSubjectCourse(
            $subjectCourse: updateSubjectCourseInput!
          ) {
            updateSubjectCourse(input: $subjectCourse) {
              subjectCourse {
                id
              }
            }
          }
        `,
        variables: {
          subjectCourse: {
            description: args.description,
            subject: args.subject,
            course: args.course,
            subjectLink: args.subjectLink,
            courseLink: args.courseLink,
            hours: args.hours,
            level: args.level,
            id: args.id,
          },
        },
      })
      .then(
        r =>
          r.data &&
          r.data.updateSubjectCourse &&
          r.data.updateSubjectCourse.subjectCourse,
      );
  }
  return subjectCourse;
}
