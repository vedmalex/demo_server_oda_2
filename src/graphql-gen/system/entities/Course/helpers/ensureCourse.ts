import gql from 'graphql-tag';

export default async function ensureCourse({ args, context, create }) {
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
  } else if (args.name) {
    fArgs = '$name: String';
    filter = 'name: $name';
    variables = {
      name: args.name,
    };
  }
  let course;
  if (filter) {
    course = await context
      .userGQL({
        query: gql`query findCourse(${fArgs}){
            course(${filter}){
              id
            }
          }
          `,
        variables,
      })
      .then(r => r.data.course);
  }

  if (!course) {
    if (create) {
      course = await context
        .userGQL({
          query: gql`
            mutation createCourse($course: createCourseInput!) {
              createCourse(input: $course) {
                course {
                  node {
                    id
                  }
                }
              }
            }
          `,
          variables: {
            course: {
              name: args.name,
              subjects: args.subjects,
              groups: args.groups,
              id: args.id,
            },
          },
        })
        .then(r => r.data.createCourse.course.node);
    }
  } else {
    // update
    course = await context
      .userGQL({
        query: gql`
          mutation updateCourse($course: updateCourseInput!) {
            updateCourse(input: $course) {
              course {
                id
              }
            }
          }
        `,
        variables: {
          course: {
            name: args.name,
            subjects: args.subjects,
            groups: args.groups,
            id: args.id,
          },
        },
      })
      .then(r => r.data.updateCourse.course);
  }
  return course;
}
