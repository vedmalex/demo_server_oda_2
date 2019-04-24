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
      .then(r => r.data.subjectCourse);
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
              createdBy: args.createdBy,
              updateBy: args.updateBy,
              createdAt: args.createdAt,
              updatedAt: args.updatedAt,
              removed: args.removed,
              owner: args.owner,
            },
          },
        })
        .then(r => r.data.createSubjectCourse.subjectCourse.node);
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
            createdBy: args.createdBy,
            updateBy: args.updateBy,
            createdAt: args.createdAt,
            updatedAt: args.updatedAt,
            removed: args.removed,
            owner: args.owner,
          },
        },
      })
      .then(r => r.data.updateSubjectCourse.subjectCourse);
  }
  return subjectCourse;
}
